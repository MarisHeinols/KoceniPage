import { collection, deleteDoc, Firestore, getDocs } from 'firebase/firestore';

export const parseAddress = (fullAddress: string) => {
	const parts = fullAddress.split(',').map((p) => p.trim());

	if (parts.length < 3) {
		return { address: fullAddress, city: '' };
	}

	const address = parts.slice(0, 2).join(' ');

	const city = parts[2];

	return { address, city };
};

export const parseExcelSerialDate = (
	serial: number | string | undefined
): Date | null => {
	if (serial === undefined || serial === null || serial === '') return null;

	if (typeof serial === 'number') {
		// Excel stores dates as number of days since 1899-12-31
		const utc_days = serial - 25569;
		const utc_value = utc_days * 86400 * 1000;
		return new Date(utc_value);
	}

	if (typeof serial === 'string') {
		// fallback to Latvian date string parser
		return parseLatvianDate(serial);
	}

	return null;
};

export const parseLatvianDate = (dateStr: string | undefined): Date | null => {
	if (!dateStr) return null;

	// Handle common Latvian date formats: "01.07.2025" or "01/07/2025"
	const match = dateStr.match(/^(\d{1,2})[./](\d{1,2})[./](\d{4})$/);
	if (!match) return null;

	const day = parseInt(match[1], 10);
	const month = parseInt(match[2], 10) - 1; // JS months 0-11
	const year = parseInt(match[3], 10);

	const date = new Date(year, month, day);
	return isNaN(date.getTime()) ? null : date;
};

export const parseLatvianAddress = (
	fullAddress: string
): { city: string; address: string } => {
	if (!fullAddress) return { city: '', address: '' };

	const parts = fullAddress
		.split(',')
		.map((p) => p.trim())
		.filter(Boolean);

	if (parts.length < 2) {
		return {
			address: parts[0] || '',
			city: '',
		};
	}

	const address = parts[0];
	const city = parts[1];

	return { city, address };
};

export interface CacheOptions<T> {
	key: string;
	durationMs?: number;
	fetchFn: () => Promise<T>;
	forceRefresh?: boolean;
}

export async function getCachedData<T>({
	key,
	durationMs = 4 * 60 * 60 * 1000,
	fetchFn,
	forceRefresh = false,
}: CacheOptions<T>): Promise<T> {
	try {
		const cached = localStorage.getItem(key);

		if (!forceRefresh && cached) {
			const parsed = JSON.parse(cached);
			const isFresh = Date.now() - parsed.timestamp < durationMs;

			if (isFresh && parsed.data) {
				return parsed.data as T;
			}
		}

		const data = await fetchFn();

		localStorage.setItem(
			key,
			JSON.stringify({
				timestamp: Date.now(),
				data,
			})
		);

		return data;
	} catch (err) {
		console.error(`Error loading cached data for ${key}:`, err);
		const fallback = localStorage.getItem(key);
		if (fallback) {
			try {
				const parsed = JSON.parse(fallback);
				return parsed.data as T;
			} catch {
				return {} as T;
			}
		}
		throw err;
	}
}

export function clearAllCaches() {
	try {
		localStorage.clear();
		console.log('Cleared all localStorage caches');
	} catch (err) {
		console.error('Failed to clear all caches', err);
	}
}

export const clearCollection = async (
	db: Firestore,
	collectionName: string
) => {
	const snapshot = await getDocs(collection(db, collectionName));
	const deletePromises = snapshot.docs.map((d) => deleteDoc(d.ref));
	await Promise.all(deletePromises);
	console.log(`Cleared ${snapshot.size} docs from "${collectionName}".`);
};
