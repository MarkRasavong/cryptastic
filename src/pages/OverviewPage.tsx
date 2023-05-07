import React from 'react';
import { CoinTable } from '../components/CoinTable';

const OverviewPage = () => {
	return (
		<section className="max-w-screen-lg mx-auto">
			<h2>Crypto Overview</h2>
			<CoinTable />
		</section>
	);
};

export default OverviewPage;
