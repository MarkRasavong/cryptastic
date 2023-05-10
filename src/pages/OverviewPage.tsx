import React from 'react';
import { CoinTable } from '../components/CoinTable';
import CoinGraphs from '../components/CoinGraphs';

const OverviewPage = () => {
	return (
		<section className="max-w-screen-lg mx-auto">
			<CoinGraphs />
			<h2>Crypto Overview</h2>
			<CoinTable />
		</section>
	);
};

export default OverviewPage;
