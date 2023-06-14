import React from 'react';
import { useAppSelector } from '../redux/app/hooks';
import { moneySuffix, setCurrency, timeConverter } from '../utils';

interface CoinGraphTitleProps {
	volume?: boolean;
}

const CoinGraphTitle: React.FC<CoinGraphTitleProps> = ({ volume }) => {
	const { value } = useAppSelector((state) => state.currency);
	const { userSelection, currentPrice, lastUpdated, totalVolume } = useAppSelector(
		(state) => state.homeMarketGraphs
	);

	const coinAbv: string = userSelection === 'bitcoin' ? 'BTC' : 'ETH';

	return (
		<div className="h-full">
			<h3>{volume ? `${coinAbv} Total Volume` : coinAbv}</h3>
			<p>
				{setCurrency(value)}
				{moneySuffix(volume ? totalVolume : currentPrice)}
			</p>
			<p>{timeConverter(lastUpdated)}</p>
		</div>
	);
};

export default CoinGraphTitle;
