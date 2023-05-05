import React, { useEffect, useState } from 'react';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { useAppSelector } from '../redux/app/hooks';
import axios from 'axios';
import { CoinGeckoApiProps } from '../constants';
import { roundToTwoDecimalPlaces, setCurrency } from '../utils';
import { TickerSymbolDown, TickerSymbolUp } from './icons/TickerSymbol';
import ProgressBar from './ProgressBar';

export const CoinTable: React.FC = () => {
	const currency = useAppSelector((state) => state.currency.value);
	const [coins, setCoins] = useState<null | CoinGeckoApiProps[]>(null);
	const [apiLoading, setApiLoading] = useState(false);
	const [itemsPerPage, setItemsPerPage] = useState(25);
	const [filterSelection, setFilterSelection] = useState({
		marketCapRank: {
			id: 1,
			title: '#',
			prop: 'market_cap_rank',
			upArrow: false,
		},
		name: { id: 2, title: 'Name', prop: 'name', upArrow: false },
		price: { id: 3, title: 'Price', prop: 'current_price', upArrow: false },
		hour: {
			id: 4,
			title: '1h%',
			prop: 'price_change_percentage_1h_in_currency',
			upArrow: false,
		},
		day: {
			id: 5,
			title: '24h%',
			prop: 'price_change_percentage_24h_in_currency',
			upArrow: false,
		},
		week: {
			id: 6,
			title: '7d%',
			prop: 'price_change_percentage_7d_in_currency',
			upArrow: false,
		},
	});

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

	console.log(coins);

	const setFilterArrowDirection = (id: number) => {
		const filter = Object.values(filterSelection).map((item) => {
			if (item.id === id) {
				return { ...item, upArrow: !item.upArrow };
			} else {
				return { ...item, upArrow: false };
			}
		});
		setFilterSelection(Object(filter));
	};

	useEffect(() => {
		getCoinData();
	}, []);

	return (
		<>
			<div className="overflow-x-auto rounded-md table-fixed w-full">
				<table className="bg-darkNonIntComponentBg">
					<thead>
						<tr>
							{Object.values(filterSelection).map(({ title, id, prop, upArrow }) => (
								<th
									className="py-2 px-4 w-max"
									key={id}
									onClick={() => setFilterArrowDirection(id)}
								>
									<span className="flex items-center">
										<span className="mr-1">{title}</span>
										{upArrow ? (
											<FaSortAmountUp size={'0.8rem'} />
										) : (
											<FaSortAmountDown size={'0.8rem'} />
										)}
									</span>
								</th>
							))}
							<th className="py-2 px-4 w-max">24h Volume/Market Cap</th>
							<th className="py-2 px-4 w-max">Circulating/Total Supply</th>
							<th className="py-2 px-4 w-max">Last 7d</th>
						</tr>
					</thead>
					<tbody>
						{coins &&
							coins.map((coin) => (
								<tr key={`td_${coin.name}`} className="py-2 px-4 border-b border-gray-300 w-max">
									<td>
										<div>{coin.market_cap_rank}</div>
									</td>
									<td className="flex">
										<img src={coin.image} alt={coin.name + ' logo'} className="mr-2 w-5 h-5" />
										<span className="flex">
											<p className="mr-1">{coin.name}</p>{' '}
											<p>{`(${coin.symbol.toLocaleUpperCase()})`}</p>
										</span>
									</td>
									<td>
										{setCurrency(currency)}
										{coin.current_price}
									</td>
									<td>
										<span className="flex items-center">
											{coin.price_change_percentage_1h_in_currency > 0 ? (
												<TickerSymbolUp />
											) : (
												<TickerSymbolDown />
											)}
											{roundToTwoDecimalPlaces(coin.price_change_percentage_1h_in_currency)}
										</span>
									</td>
									<td>
										<span className="flex items-center">
											{coin.price_change_percentage_24h_in_currency > 0 ? (
												<TickerSymbolUp />
											) : (
												<TickerSymbolDown />
											)}
											{roundToTwoDecimalPlaces(coin.price_change_percentage_24h_in_currency)}
										</span>
									</td>
									<td>
										<span className="flex items-center">
											{coin.price_change_percentage_7d_in_currency > 0 ? (
												<TickerSymbolUp />
											) : (
												<TickerSymbolDown />
											)}
											{roundToTwoDecimalPlaces(coin.price_change_percentage_7d_in_currency)}
										</span>
									</td>
									<td>
										<ProgressBar values={{ first: coin.total_volume, second: coin.market_cap }} />
									</td>
									<td>
										<ProgressBar
											values={{ first: coin.circulating_supply, second: coin.total_supply }}
										/>
									</td>
									<td></td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</>
	);
};
