import React, { useEffect, useState } from 'react';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { TickerSymbolDown, TickerSymbolUp } from './icons/TickerSymbol';
import ProgressBar from './ProgressBar';
import SmallGraph from './SmallGraph';
import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
import { roundToTwoDecimalPlaces, setCurrency } from '../utils';
import InfiniteScroll from 'react-infinite-scroll-component';
import TableFilter from './TableFilter';
import {
	fetchCoinData,
	scrollMoreCoins,
	getFilteredCoins,
	PropertyOfCoinGeckoApiProps,
} from '../features/api';
import ThreeDotsLoader from './icons/ThreeDots';

interface CoinTableHeader {
	[key: string]: {
		id: number;
		title: string;
		prop: PropertyOfCoinGeckoApiProps;
		upArrow: boolean;
	};
}

export const CoinTable: React.FC = () => {
	const dispatch = useAppDispatch();
	const currency = useAppSelector((state) => state.currency.value);
	const { coins, apiLoading } = useAppSelector((state) => state.api);
	const hasCoins = !apiLoading && coins;
	const loadingplaceHolders = Array.apply(null, Array(25)).map(function () {});

	const [filterSelection, setFilterSelection] = useState<CoinTableHeader>({
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

	//console.log(coins && coins[0].sparkline_in_7d);
	const setFilterArrowDirection = (id: number, prop: PropertyOfCoinGeckoApiProps) => {
		const filter = Object.values(filterSelection).map((item) => {
			if (item.id === id) {
				dispatch(getFilteredCoins({ prop, upArrow: item.upArrow }));
				return { ...item, upArrow: !item.upArrow };
			} else {
				return { ...item, upArrow: false };
			}
		});
		setFilterSelection(Object(filter));
	};

	useEffect(() => {
		dispatch(fetchCoinData());
	}, []);

	return (
		<>
			<div className="mx-auto w-full text-xs whitespace-nowrap no-scrollbar dark:bg-darkNonIntComponentBg bg-lightModeWhite rounded-lg">
				<InfiniteScroll
					dataLength={coins && coins.length}
					hasMore={true}
					loader={
						<div className="w-full flex justify-center">
							<ThreeDotsLoader color="#2c2fe6" width={60} />
						</div>
					}
					next={() => dispatch(scrollMoreCoins())}
				>
					<TableFilter />
					<table className="w-full border-t dark:border-darkIntComponentBg border-x-lightModeBgFooterMobile">
						<thead>
							<tr>
								{Object.values(filterSelection).map(({ title, id, prop, upArrow }) => (
									<th
										className="py-2 px-4 w-max cursor-pointer"
										key={id}
										onClick={() => setFilterArrowDirection(id, prop)}
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
							{coins.map((coin) => (
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
									<div className="border-b dark:border-darkIntComponentBg border-x-lightModeBgFooterMobile w-full"></div>
								</tr>
							))}
							{coins.length === 0 &&
								loadingplaceHolders.map((item, idx) => (
									<tr key={idx + '_skeletonCoinTable'} aria-label="loading skeleton">
										<td>
											<div className="skeletonCoinTableSkeleton w-11/12 mb-1" />
										</td>
										<td>
											<div className="skeletonCoinTableSkeleton w-11/12 mb-1" />
										</td>
										<td>
											<div className="skeletonCoinTableSkeleton w-11/12 mb-1" />
										</td>
										<td>
											<div className="skeletonCoinTableSkeleton w-11/12 mb-1" />
										</td>
										<td>
											<div className="skeletonCoinTableSkeleton w-11/12 mb-1" />
										</td>
										<td>
											<div className="skeletonCoinTableSkeleton w-11/12 mb-1" />
										</td>
										<td>
											<div className="skeletonCoinTableSkeleton w-11/12 mb-1" />
										</td>
										<td>
											<div className="skeletonCoinTableSkeleton w-11/12 mb-1" />
										</td>
										<td>
											<div className="skeletonCoinTableSkeleton w-11/12 mb-1" />
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</InfiniteScroll>
			</div>
		</>
	);
};
