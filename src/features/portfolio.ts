import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '../redux/app/store';
import axios from 'axios';
import { CoinPageData } from '../pages/CoinPage';
import { relativeChange } from '../utils';

export interface Profile {
	id: string;
	symbol: string;
	image: string;
	name: string;
	purchase_date: string;
	coinAmount: number;
	marketCap: number;
	totalVolume: number;
	total: number;
	previousPrice: number;
	currentPrice: number;
	priceChange24h: number;
	priceChange: number;
	circulatingSupply: number;
	maxSupply: number | null;
	isBigger: boolean;
}

interface CoinData {
	id: string;
	symbol: string;
	name: string;
	localization: {
		[key: string]: string;
	};
	image: {
		thumb: string;
		small: string;
	};
	market_data: {
		current_price: {
			[key: string]: number;
		};
		market_cap: {
			[key: string]: number;
		};
		total_volume: {
			[key: string]: number;
		};
	};
	community_data: {
		facebook_likes: number | null;
		twitter_followers: number;
		reddit_average_posts_48h: number;
		reddit_average_comments_48h: number;
		reddit_subscribers: number;
		reddit_accounts_active_48h: string;
	};
	developer_data: {
		forks: number;
		stars: number;
		subscribers: number;
		total_issues: number;
		closed_issues: number;
		pull_requests_merged: number;
		pull_request_contributors: number;
		code_additions_deletions_4_weeks: {
			additions: number;
			deletions: number;
		};
		commit_count_4_weeks: number;
	};
	public_interest_stats: {
		alexa_rank: number | null;
		bing_matches: number | null;
	};
}

const initialState = {
	loading: false,
	coins: [
		{
			id: 'bitcoin',
			name: 'Bitcoin',
			coinAmount: 12,
			purchase_date: '2018-12-12',
		},
		{
			id: 'ethereum',
			name: 'Ethereum',
			coinAmount: 7,
			purchase_date: '2023-07-28',
		},
	] as Profile[],
};

export const portfolioSlice = createSlice({
	name: 'portfolio',
	initialState,
	reducers: {
		updatePortfolio: (state, action) => {
			state.coins = [...action.payload];
		},
		deletePortfolioAsset: (state, action) => {
			state.coins = state.coins.filter((item) => item.id !== action.payload.id);
		},
		setApiLoading: (state, action) => {
			state.loading = action.payload;
		},
	},
});

export const fetchPortfolioData = (): AppThunk => async (dispatch, getState) => {
	const { value: currency } = getState().currency;
	const { coins } = getState().portfolio;

	let noDuplicates = coins.reduce((acc: { [key: string]: Profile }, el) => {
		if (acc[el.id]) return acc;
		return { ...acc, [el.id]: { ...el } };
	}, {});

	const newPortfolio = await Promise.all(
		coins.map(async ({ purchase_date, id, coinAmount }) => {
			const dateByAPI = purchase_date.split('-');
			const data = await fetch(
				`https://api.coingecko.com/api/v3/coins/${id}/history?date=${dateByAPI[2]}-${dateByAPI[1]}-${dateByAPI[0]}` //dd/mm/yyyy
			);
			const date = purchase_date.split('-');
			const purchaseDate = `${date[2]}-${date[0]}-${date[1]}`;
			const json: CoinData = await data.json();

			const currentCoin = (await axios(`https://api.coingecko.com/api/v3/coins/${id}`))
				.data as CoinPageData;

			return {
				id: json.id,
				name: json.name,
				symbol: json.symbol,
				image: json.image.thumb,
				purchase_date: purchaseDate,
				coinAmount: coinAmount,
				marketCap: json.market_data.market_cap[currency],
				totalVolume: json.market_data.total_volume[currency],
				total: coinAmount * json.market_data.current_price[currency],
				previousPrice: json.market_data.current_price[currency],
				currentPrice: currentCoin.market_data.current_price[currency],
				priceChange24h: relativeChange(
					json.market_data.current_price[currency],
					currentCoin.market_data.current_price[currency]
				),
				priceChange:
					(currentCoin.market_data.current_price[currency] -
						json.market_data.current_price[currency]) *
					coinAmount,
				circulatingSupply: currentCoin.market_data.circulating_supply,
				maxSupply: currentCoin.market_data.max_supply,
				isBigger:
					json.market_data.current_price[currency] >
					currentCoin.market_data.current_price[currency],
			};
		})
	);

	dispatch(updatePortfolio(newPortfolio));
};

export const { updatePortfolio, deletePortfolioAsset, setApiLoading } = portfolioSlice.actions;

export default portfolioSlice.reducer;
