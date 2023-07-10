import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppThunk } from '../redux/app/store';

export interface CoinGeckoApiProps {
	ath: number;
	ath_change_percentage: number;
	ath_date: string;
	atl: number;
	atl_change_percentage: number;
	atl_date: string;
	circulating_supply: number;
	current_price: number;
	fully_diluted_valuation: number;
	high_24h: number;
	id: string;
	image: string;
	last_updated: string;
	low_24h: number;
	market_cap: number;
	market_cap_change_24h: number;
	market_cap_change_percentage_24h: number;
	market_cap_rank: number;
	max_supply: number;
	name: string;
	price_change_24h: number;
	price_change_percentage_1h_in_currency: number;
	price_change_percentage_7d_in_currency: number;
	price_change_percentage_24h: number;
	price_change_percentage_24h_in_currency: number;
	roi: null | unknown;
	sparkline_in_7d: { price: number[] };
	symbol: string;
	total_supply: number;
	total_volume: number;
}

export type PropertyOfCoinGeckoApiProps =
	| 'market_cap_rank'
	| 'name'
	| 'current_price'
	| 'price_change_percentage_1h_in_currency'
	| 'price_change_percentage_24h_in_currency'
	| 'price_change_percentage_7d_in_currency';
interface CategoryProps {
	title: 'Cryptocurrency' | 'DeFi';
	value: '' | 'decentralized-finance-defi';
	active: boolean;
}

const initialState = {
	coins: [] as CoinGeckoApiProps[],
	apiLoading: false,
	page: 1,
	itemsPerPage: 25,
	category: [
		{ title: 'Cryptocurrency', value: '', active: true },
		{ title: 'DeFi', value: 'decentralized-finance-defi', active: false },
	] as CategoryProps[],
};

const apiSlice = createSlice({
	name: 'api',
	initialState,
	reducers: {
		setApiLoading: (state, action) => {
			state.apiLoading = action.payload;
		},
		setCoins: (state, action) => {
			state.coins = [...action.payload];
		},
		getFilteredCoins: (state, action) => {
			state.coins = state.coins.sort((a, b) => {
				const { prop, upArrow } = action.payload;
				const first = a[prop as PropertyOfCoinGeckoApiProps];
				const second = b[prop as PropertyOfCoinGeckoApiProps];
				const value = upArrow ? first > second : second > first;
				return value ? 1 : -1;
			});
		},
		setItemsPerPage: (state) => {
			state.itemsPerPage = state.itemsPerPage + 25;
		},
		increamentPage: (state) => {
			state.page = state.page + 1;
		},
		setActiveCategory: (state, action) => {
			const updatedCategories = state.category.map((c) => ({
				...c,
				active: c.value === action.payload,
			}));

			state.category = updatedCategories;
		},
	},
});

export const {
	setApiLoading,
	setCoins,
	setItemsPerPage,
	setActiveCategory,
	getFilteredCoins,
	increamentPage,
} = apiSlice.actions;

export const fetchCoinData = (): AppThunk => async (dispatch, getState) => {
	const { category, itemsPerPage, page } = getState().api;
	const { value: currency } = getState().currency;
	try {
		dispatch(setApiLoading(true));
		const categoryType =
			category.find((c) => c.active === true)!.value === '' ? '' : `&category=${category}`;
		const { data } = await axios(
			`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}${categoryType}&order=market_cap_desc&per_page=${itemsPerPage}&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
		);
		dispatch(setCoins(data));
		dispatch(setApiLoading(false));
	} catch (error) {
		console.log(error);
	}
};

export const updateActiveCategory =
	(value: string): AppThunk =>
	(dispatch) => {
		dispatch(setActiveCategory(value));
		dispatch(fetchCoinData());
	};

export const scrollMoreCoins = (): AppThunk => (dispatch) => {
	dispatch(setItemsPerPage());
	dispatch(fetchCoinData());
};

export default apiSlice.reducer;
