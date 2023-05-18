import React from 'react';
import { useAppSelector } from '../redux/app/hooks';
import { moneySuffix, setCurrency, timeConverter } from '../utils';

const CoinGraphTitle = () => {
	const { value } = useAppSelector((state) => state.currency);
	const { userSelection, currentPrice, lastUpdated } = useAppSelector(
		(state) => state.homeMarketGraphs
	);

	return (
		<div className="h-full">
			<h3>{userSelection[0].toUpperCase() + userSelection.slice(1)}</h3>
			<p>
				{setCurrency(value)}
				{moneySuffix(currentPrice)}
			</p>
			<p>{timeConverter(lastUpdated)}</p>
		</div>
	);
};

export default CoinGraphTitle;
