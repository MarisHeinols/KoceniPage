import type { UtilityMeeter } from '~/pages/utilityMeeterPage';

export const validateForm = (meeter: UtilityMeeter) => {
	// check required strings
	const requiredStrings = [
		meeter.id,
		meeter.client.clientFullName,
		meeter.client.mobileNr,
		meeter.city,
		meeter.adress,
	];

	const allFilled = requiredStrings.every((v) => v.trim().length > 0);

	const addressValid = isValidAddress(meeter.adress);

	return allFilled && addressValid;
};

export const isValidAddress = (value: string) => {
	const parts = value.split(',').map((p) => p.trim());
	return parts.length === 3 && parts.every((p) => p.length > 0);
};
