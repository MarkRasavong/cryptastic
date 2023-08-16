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
			purchase_date: '12-12-2018',
		},
		{
			id: 'ethereum',
			name: 'Ethereum',
			coinAmount: 7,
			purchase_date: '28-07-2023',
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
		coins.map(async (coin) => {
			const data = await fetch(
				`https://api.coingecko.com/api/v3/coins/${coin.id}/history?date=${coin.purchase_date}`
			);
			const date = coin.purchase_date.split('-');
			const purchaseDate = `${date[1]}-${date[0]}-${date[2]}`;
			const json: CoinData = await data.json();

			const currentCoin = (await axios(`https://api.coingecko.com/api/v3/coins/${coin.id}`))
				.data as CoinPageData;

			return {
				id: json.id,
				name: json.name,
				symbol: json.symbol,
				image: json.image.thumb,
				purchase_date: purchaseDate,
				coinAmount: coin.coinAmount,
				marketCap: json.market_data.market_cap[currency],
				totalVolume: json.market_data.total_volume[currency],
				total: coin.coinAmount * json.market_data.current_price[currency],
				previousPrice: json.market_data.current_price[currency],
				currentPrice: currentCoin.market_data.current_price[currency],
				priceChange24h: relativeChange(
					json.market_data.current_price[currency],
					currentCoin.market_data.current_price[currency]
				),
				priceChange:
					(currentCoin.market_data.current_price[currency] -
						json.market_data.current_price[currency]) *
					coin.coinAmount,
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
