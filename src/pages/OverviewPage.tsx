import React from 'react';
import { CoinTable } from '../components/CoinTable';
import CoinGraphs from '../components/CoinGraphs';
import { useAppDispatch } from '../redux/app/hooks';
import { fetchCoinById, fetchLineGraphData } from '../features/homeMarketGraphs';

const OverviewPage = () => {
	const dispatch = useAppDispatch();

	dispatch(fetchCoinById());
	dispatch(fetchLineGraphData('bar'));

	return (
		<section className="max-w-screen-lg mx-auto">
			<CoinGraphs />
			<h2>Crypto Overview</h2>
			<CoinTable />
		</section>
	);
};

export default OverviewPage;
