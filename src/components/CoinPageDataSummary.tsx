import React from 'react';
import { CoinPageData } from '../pages/CoinPage';
import { useAppSelector } from '../redux/app/hooks';
import pluseIcon from '../assets/web-icons/Iconly-Bulk-Plus.svg';
import { moneySuffix, roundToNumber, setCurrency } from '../utils';

interface CoinPageSummaryProps {
	profile: CoinPageData;
}

interface ProgressBarProps {
	widthPercentage: number;
	className?: string;
}

const PlusIcon = () => <img src={pluseIcon} alt="plus icon" className="w-4 h-4 rounded-md" />;

const CoinPageDataSummary = ({ profile }: CoinPageSummaryProps) => {
	const currency = useAppSelector((state) => state.currency.value);
	const { darkMode } = useAppSelector((state) => state.theme);

	const ProgressBar = ({ className, widthPercentage }: ProgressBarProps) => {
		const percentChange = roundToNumber(widthPercentage, 0);

		return (
			<div className={`flex flex-col justify-center items-center ${className}`}>
				<div className="flex justify-between w-full">
					<span className={darkMode ? 'text-darkModeSliderOrange' : 'text-cryptoRed'}>
						&#x25CF; {percentChange}%
					</span>
					<span className={darkMode ? 'text-darkModeSliderYellow' : 'text-sliderBlue'}>
						&#x25CF; {percentChange < 0 ? 100 : 100 - percentChange}%
					</span>
				</div>
				<div
					className={`relative ${
						darkMode ? 'bg-darkModeSliderYellow' : 'bg-sliderBlue'
					} h-2 w-full rounded-full overflow-hidden border-black`}
				>
					<div
						className={`absolute top-0 left-0 h-full ${
							darkMode ? 'bg-darkModeSliderOrange' : 'bg-cryptoRed'
						} rounded-full`}
						style={{ width: `${percentChange}%` }}
					/>
				</div>
			</div>
		);
	};

	const stats = [
		{
			title: 'Market Cap: ',
			value: (
				<>
					{setCurrency(currency)}
					{moneySuffix(profile.market_data.market_cap[currency])}
				</>
			),
		},
		{
			title: 'Fully Diluted Valuation: ',
			value: (
				<>
					{setCurrency(currency)}
					{profile.market_data.fully_diluted_valuation[currency]
						? moneySuffix(profile.market_data.fully_diluted_valuation[currency])
						: '0.00'}
				</>
			),
		},
		{
			title: 'Volume (24h): ',
			value: (
				<>
					{setCurrency(currency)}
					{moneySuffix(profile.market_data.total_volume[currency])}
				</>
			),
		},
		{
			title: 'Volume / Market: ',
			value: (
				<>
					{(
						profile.market_data.total_volume[currency] / profile.market_data.market_cap[currency]
					).toFixed(4)}
				</>
			),
		},
		{
			title: 'Total Volume: ',
			value: (
				<>
					{setCurrency(currency)}
					{moneySuffix(profile.market_data.total_volume[currency])}
				</>
			),
		},
		{
			title: 'Circulating Supply: ',
			value: (
				<>
					{roundToNumber(profile.market_data.circulating_supply, 0)} {profile.symbol.toUpperCase()}
				</>
			),
		},
		{
			title: 'Max Supply: ',
			value: (
				<>
					{profile.market_data.max_supply ? profile.market_data.max_supply : 0}{' '}
					{profile.symbol.toUpperCase()}
				</>
			),
		},
	];

	return (
		<div className="bg-lightModeWhite dark:bg-darkNonIntComponentBg dark:text-white w-fit p-4 rounded-lg text-center flex flex-col justify-around">
			<div>
				{stats.slice(0, 4).map((stat, idx) => (
					<div key={`stats_top_${idx}`} className="flex mb-1">
						<PlusIcon />
						<span className="ml-2 text-[0.6rem] font-bold">{stat.title}</span>
						<span className="ml-2 text-[0.6rem]">{stat.value}</span>
					</div>
				))}
				<div className="mt-5">
					{stats.slice(4).map((stat, idx) => (
						<div key={`stats_btm_${idx}`} className="flex mb-1">
							<PlusIcon />
							<span className="ml-2 text-[0.6rem] font-bold">{stat.title}</span>
							<span className="ml-2 text-[0.6rem]">{stat.value}</span>
						</div>
					))}
				</div>
			</div>
			<ProgressBar
				className="w-full"
				widthPercentage={profile.market_data.price_change_percentage_24h_in_currency[currency]}
			/>
		</div>
	);
};

export default CoinPageDataSummary;
