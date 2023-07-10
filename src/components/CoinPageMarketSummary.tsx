import React from 'react';
import { roundToTwoDecimalPlaces, setCurrency, setDate, setToSciNotation } from '../utils';
import { CoinPageData } from '../pages/CoinPage';
import { useAppSelector } from '../redux/app/hooks';
import { TickerSymbolDown, TickerSymbolUp } from './icons/TickerSymbol';
import { FaCoins } from 'react-icons/fa';

interface CoinPageSummaryProps {
	profile: CoinPageData;
}

const getPercentChange = (percent: number) => {
	const percentChange = percent ? roundToTwoDecimalPlaces(percent) : 0;
	return percentChange < 0 ? (
		<span className="text-cryptoRed flex items-center text-xs">
			<TickerSymbolDown />
			{percentChange}%
		</span>
	) : (
		<span className="text-cryptoGreen flex items-center text-xs">
			<TickerSymbolUp />
			{percentChange}%
		</span>
	);
};

const CoinPageMarketSummary = ({ profile }: CoinPageSummaryProps) => {
	const currency = useAppSelector((state) => state.currency.value);

	const getProfit = (priceChange24: number, currentPrice: number) => {
		const profitPercent = priceChange24 ? (priceChange24 * currentPrice) / 100 : 0;
		const profit = roundToTwoDecimalPlaces(profitPercent);
		return profit < 0 ? (
			<span className="text-cryptoRed">
				{setCurrency(currency)}({Math.abs(profit)})
			</span>
		) : (
			<span className="text-cryptoGreen">
				{setCurrency(currency)}
				{profit}
			</span>
		);
	};

	const setNotation = (price: number) => {
		return price >= 1 ? price : setToSciNotation(price, 2);
	};

	return (
		<div className="bg-lightModeWhite dark:bg-darkNonIntComponentBg dark:text-white w-fit py-4 p-14 rounded-lg text-center flex flex-col justify-between">
			<div className="flex justify-center">
				<h2 className="mr-2 text-2xl font-medium">
					{setCurrency(currency)}
					{roundToTwoDecimalPlaces(profile.market_data.current_price[currency])}
				</h2>
				{getPercentChange(profile.market_data.price_change_percentage_24h_in_currency[currency])}
			</div>
			<div className="text-xs justify-center flex">
				<span className="mr-1">Profit:</span>
				{getProfit(
					profile.market_data.price_change_percentage_24h_in_currency[currency],
					profile.market_data.current_price[currency]
				)}
			</div>
			<div className="w-full flex justify-center py-2">
				<FaCoins />
			</div>
			<div className="flex flex-col justify-center">
				<div className="flex items-center w-full">
					<div className="mr-2">
						<TickerSymbolUp />
					</div>
					<div className="flex flex-col text-[0.6rem]">
						<p className="leading-6">
							<span className="font-bold">All Time High:</span> {setCurrency(currency)}
							{setNotation(profile.market_data.ath[currency])}
						</p>
						<p>{setDate(profile.market_data.ath_date[currency])}</p>
					</div>
				</div>
				<div className="flex items-center w-full">
					<div className="mr-2">
						<TickerSymbolDown />
					</div>
					<div className="flex flex-col text-[0.6rem] mt-2">
						<p className="leading-6">
							<span className="font-bold">All Time Low:</span> {setCurrency(currency)}
							{setNotation(profile.market_data.atl[currency])}
						</p>
						<p>{setDate(profile.market_data.atl_date[currency])}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CoinPageMarketSummary;
