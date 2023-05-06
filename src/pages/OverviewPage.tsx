import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '../redux/app/hooks';
import { CoinTable } from '../components/CoinTable';
import { CoinGeckoApiProps } from '../constants';

const OverviewPage = () => {
	const currency = useAppSelector((state) => state.currency.value);
	const [apiLoading, setApiLoading] = useState(false);
	const [itemsPerPage, setItemsPerPage] = useState(25);
	const [coins, setCoins] = useState<null | CoinGeckoApiProps[]>(null);

	const getCoinData = async () => {
		try {
			setApiLoading(true);
			const { data } = await axios(
				`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${itemsPerPage}&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
			);
			setCoins(data);
			setApiLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getCoinData();
	}, []);

	console.log(coins && coins[0].sparkline_in_7d);
	return (
		<section className="max-w-screen-lg mx-auto">
			<h2>Crypto Overview</h2>
			<CoinTable coins={coins} />
		</section>
	);
};

export default OverviewPage;
