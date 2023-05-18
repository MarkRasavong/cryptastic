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

export const moneySuffix = (num: number) => {
	const suffixes = [
		{ threshold: 1e12, suffix: 'T' },
		{ threshold: 1e9, suffix: 'B' },
		{ threshold: 1e6, suffix: 'M' },
		{ threshold: 1e3, suffix: 'K' },
	];
	for (const { threshold, suffix } of suffixes) {
		if (num >= threshold) {
			return +(num / threshold).toFixed(2) + suffix;
		}
	}
	return num;
};

export const timeConverter = (t: string): string => {
	const date = new Date(t);
	const year = date.getFullYear();
	const month = date.toLocaleString('en-us', { month: 'short' });
	const day = date.getDate();

	return `${month} ${day}, ${year}`;
};
