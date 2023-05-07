import React from 'react';
import { useAppSelector } from '../redux/app/hooks';
import { CoinTable } from '../components/CoinTable';

const OverviewPage = () => {
	const currency = useAppSelector((state) => state.currency.value);
	return (
		<section className="max-w-screen-lg mx-auto">
			<h2>Crypto Overview</h2>
			<CoinTable />
		</section>
	);
};

export default OverviewPage;
