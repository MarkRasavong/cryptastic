import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../redux/app/hooks';
import axios from 'axios';
import { moneySuffix, roundToNumber, setCurrency } from '../utils';
import { TickerSymbolDown, TickerSymbolUp } from './icons/TickerSymbol';
import bitcoinIcon from '../assets/bitcoin.webp';
import ethereumIcon from '../assets/ethereum.webp';

interface CryptoData {
	active_cryptocurrencies: number;
	upcoming_icos: number;
	ongoing_icos: number;
	ended_icos: number;
	markets: number;
	total_market_cap: {
		usd: number;
		eur: number;
		gbp: number;
	};
	total_volume: {
		usd: number;
		eur: number;
		gbp: number;
	};
	market_cap_percentage: {
		btc: number;
		eth: number;
		usdt: number;
		bnb: number;
		usdc: number;
		xrp: number;
		steth: number;
		ada: number;
		doge: number;
		sol: number;
	};
	market_cap_change_percentage_24h_usd: number;
	updated_at: number;
}

interface ProgressBarProps {
	widthPercentage: number;
	className?: string;
}

const CoinNavSummary = () => {
	const currency = useAppSelector((state) => state.currency.value);
	const { darkMode } = useAppSelector((state) => state.theme);
	const [market, setMarket] = useState<CryptoData | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const ProgressBar = ({ className, widthPercentage }: ProgressBarProps) => (
		<div className={`flex flex-col w-14 justify-center items-center ${className}`}>
			<div
				className={`relative bg-sliderBlue h-3 w-full rounded-full overflow-hidden border-black`}
			>
				<div
					className={`absolute top-0 left-0 h-full ${
						darkMode ? 'bg-cryptoSliderWhite' : 'bg-black'
					} rounded-full`}
					style={{ width: `${widthPercentage}%` }}
				/>
			</div>
		</div>
	);

	const fetchMarketData = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios('https://api.coingecko.com/api/v3/global');
			if (data) {
				setMarket(data.data);
				setIsLoading(false);
			}
		} catch (error) {
			console.log('error: CoinNavSummary', error);
		}
	};

	useEffect(() => {
		fetchMarketData();
	}, []);

	const hasMarketData = !isLoading && market;

	return (
		<div
			className={`${
				darkMode && 'dark'
			} dark:bg-darkBg bg-lightModeBgGray dark:text-white flex justify-center items-center w-full text-[11px]`}
		>
			<div className="bg-lightModeWhite dark:bg-darkNonIntComponentBg w-full sm:w-fit rounded-b-md flex sm:p-2 sm:justify-around overflow-auto no-scrollbar">
				{hasMarketData && (
					<>
						<div className="dark:text-white flex mr-2 ml-2 sm:ml-0">
							Coins {market.active_cryptocurrencies}
						</div>
						<div className="dark:text-white flex mr-2">Exchange {market.markets}</div>
						<div className="flex items-center mr-2">
							<div className="mr-1">&#x25CF;</div>
							<div>{setCurrency(currency)}</div>
							<div>{moneySuffix(market.total_market_cap[currency])}</div>
							{market.market_cap_change_percentage_24h_usd > 0 ? (
								<TickerSymbolUp />
							) : (
								<TickerSymbolDown />
							)}
						</div>
						<div className="flex justify-center items-center mr-2">
							<div className="mr-1">&#x25CF;</div>
							<div>{setCurrency(currency)}</div>
							<div>{moneySuffix(market.total_volume[currency])}</div>
						</div>
						<div className="flex justify-center items-center mr-2">
							<img
								className="h-3.5 sm:h-4 lg:w-5 mr-1"
								src={bitcoinIcon}
								alt="Bitcoin icon for the coin nav summary component"
							/>
							<p className="mr-1">{roundToNumber(market.market_cap_percentage.btc, 0)}%</p>
							<ProgressBar widthPercentage={market.market_cap_percentage.btc} className="" />
						</div>
						<div className="flex justify-center items-center mr-2 sm:mr-0">
							<img
								className="h-3.5 sm:h-4 lg:w-5"
								src={ethereumIcon}
								alt="Ethereum icon for the coin nav summary component"
							/>
							<p className="mr-1">{roundToNumber(market.market_cap_percentage.eth, 0)}%</p>
							<ProgressBar widthPercentage={market.market_cap_percentage.eth} className="" />
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default CoinNavSummary;
