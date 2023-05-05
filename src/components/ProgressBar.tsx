import React from 'react';
import { useAppSelector } from '../redux/app/hooks';
import { moneySuffix, setCurrency } from '../utils';

interface ProgressBarProps {
	values: {
		first: number;
		second: number;
	};
}

const ProgressBar: React.FC<ProgressBarProps> = ({ values }) => {
	const isDark = useAppSelector((state) => state.theme.darkMode);
	const currency = useAppSelector((state) => state.currency.value);
	const percentageDifference = (values.first * 100) / values.second;
	const widthPercentage = percentageDifference === Infinity ? 100 : percentageDifference;

	return (
		<div className="flex flex-col">
			<div className="flex justify-between">
				<span className={isDark ? 'text-darkModeSliderOrange' : 'text-cryptoRed'}>
					&#x25CF; {setCurrency(currency)} {moneySuffix(values.first)}
				</span>
				<span className={isDark ? 'text-darkModeSliderYellow' : 'text-sliderBlue'}>
					{values.second === null ? '∞' : `● ${setCurrency(currency)}${moneySuffix(values.second)}`}
				</span>
			</div>
			<div
				className={`relative ${
					isDark ? 'bg-darkModeSliderYellow' : 'bg-sliderBlue'
				} h-2 w-full rounded-full overflow-hidden border-black`}
			>
				<div
					className={`absolute top-0 left-0 h-full ${
						isDark ? 'bg-darkModeSliderOrange' : 'bg-cryptoRed'
					} rounded-full`}
					style={{ width: `${widthPercentage}%` }}
				/>
			</div>
		</div>
	);
};

export default ProgressBar;
