export type currencyType = 'usd' | 'eur' | 'gbp';
export const setCurrency = (currency: currencyType): string => {
	const currenctLibrary = {
		usd: '$',
		eur: '€',
		gbp: '£',
	};

	return currenctLibrary[currency];
};

export const roundToTwoDecimalPlaces = (num: number): number => {
	return Math.round((num + Number.EPSILON) * 100) / 100;
};
