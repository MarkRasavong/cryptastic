import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../redux/app/hooks';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CoinPage: React.FC = () => {
	const { id } = useParams();
	const currency = useAppSelector((state) => state.currency.value);
	const [profile, setProfile] = useState<any>();
	const [isLoading, setIsLoading] = useState(false);

	const getCoinInfo = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios(
				`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=true`
			);
			setProfile(data);
			setIsLoading(false);
		} catch (err) {
			console.log('Location Error:', err);
		}
	};

	useEffect(() => {
		getCoinInfo();
	}, [id]);

	const hasCoinProfile = !isLoading && profile;

	console.log(profile);

	return <div></div>;
};

export default CoinPage;
