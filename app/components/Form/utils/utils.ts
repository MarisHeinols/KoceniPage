import type { Details, UtilityMeeter } from '~/pages/utilityMeeterPage';

const requiredFields: (keyof UtilityMeeter['details'])[] = [
	'action',
	'radijums',
	'iemesls',
	'novietojums',
	'atrodas',
	'installed',
	'tips',
	'plombaNr',
	'marka',
	'diametrs',
	'garums',
	'verifiedTillDate',
];

export const isFormComplete = (formData: Details) => {
	return requiredFields.every((field) => {
		const value = formData[field];
		if (Array.isArray(value)) return value.length > 0;
		if (value instanceof Date) return true;
		return value !== null && value !== undefined && value !== '';
	});
};
