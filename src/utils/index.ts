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

export const roundToNumber = (number: number, roundNum: number) => {
	return +(Math.round(parseFloat(number + `e+${String(roundNum)}`)) + `e-${String(roundNum)}`);
};

export const setToSciNotation = (decimal: number, roundNum: number) => {
	return Number.parseFloat(String(decimal)).toExponential(roundNum);
};

export const setDate = (dateString: number) => {
	const formatDate = new Date(dateString);
	const hours = formatDate.getHours();
	const minutes = formatDate.getMinutes();
	const seconds = formatDate.getSeconds();

	return `${formatDate.toLocaleDateString('en-US')}, 
    ${hours < 12 ? hours : hours - 12}:${minutes < 10 ? '0' + minutes : minutes}:${
		seconds < 10 ? '0' + seconds : seconds
	}
    ${hours < 12 ? 'AM' : 'PM'}`;
};

export const relativeChange = (initialValue: number, finalValue: number) => {
	return (finalValue - initialValue) / initialValue;
};
