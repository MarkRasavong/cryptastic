import React, { useEffect, useState } from 'react';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import axios from 'axios';
import { TickerSymbolDown, TickerSymbolUp } from './icons/TickerSymbol';
import ProgressBar from './ProgressBar';
import SmallGraph from './SmallGraph';
import { CoinGeckoApiProps } from '../constants';
import { useAppSelector } from '../redux/app/hooks';
import { roundToTwoDecimalPlaces, setCurrency } from '../utils';

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
			<div className="mx-auto w-full text-xs whitespace-nowrap no-scrollbar">
				<table className="dark:bg-darkNonIntComponentBg bg-lightModeWhite rounded-lg">
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
								<tr
									key={`td_${coin.name}`}
									className="border-b dark:border-darkIntComponentBg border-x-lightModeBgFooterMobile"
								>
									<td className="text-center">
										<div>{coin.market_cap_rank}</div>
									</td>
									<td>
										<div className="flex">
											<img src={coin.image} alt={coin.name + ' logo'} className="mr-2 w-5 h-5" />
											<span className="flex">
												<p className="mr-2">
													{coin.name} {`(${coin.symbol.toLocaleUpperCase()})`}
												</p>
											</span>
										</div>
									</td>
									<td className="text-center">
										{setCurrency(currency)}
										{coin.current_price}
									</td>
									<td>
										<span className="flex items-center justify-center">
											{coin.price_change_percentage_1h_in_currency > 0 ? (
												<TickerSymbolUp />
											) : (
												<TickerSymbolDown />
											)}
											{roundToTwoDecimalPlaces(coin.price_change_percentage_1h_in_currency)}
										</span>
									</td>
									<td>
										<span className="flex items-center justify-center">
											{coin.price_change_percentage_24h_in_currency > 0 ? (
												<TickerSymbolUp />
											) : (
												<TickerSymbolDown />
											)}
											{roundToTwoDecimalPlaces(coin.price_change_percentage_24h_in_currency)}
										</span>
									</td>
									<td>
										<span className="flex items-center justify-center">
											{coin.price_change_percentage_7d_in_currency > 0 ? (
												<TickerSymbolUp />
											) : (
												<TickerSymbolDown />
											)}
											{roundToTwoDecimalPlaces(coin.price_change_percentage_7d_in_currency)}
										</span>
									</td>
									<td>
										<ProgressBar
											values={{ first: coin.total_volume, second: coin.market_cap }}
											className="mr-2"
										/>
									</td>
									<td>
										<ProgressBar
											values={{ first: coin.circulating_supply, second: coin.total_supply }}
											className="mr-2"
										/>
									</td>
									<td>
										<SmallGraph graphData={coin.sparkline_in_7d.price} className="mr-2" />
									</td>
									<div className="border-b border-gray-400 w-full"></div>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</>
	);
};
