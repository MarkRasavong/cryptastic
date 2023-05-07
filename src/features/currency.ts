import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { currencyType } from '../utils';
import { setApiLoading, setCoins } from './api';
import { RootState } from '../redux/app/store';

const initialState = {
	value: (localStorage.getItem('currency') as currencyType) || 'usd',
	loading: false,
};

export const currencySlice = createSlice({
	name: 'currency',
	initialState,
	reducers: {
		setCurrency: (state, action) => {
			state.value = action.payload;
			localStorage.setItem('currency', action.payload);
			state.loading = true;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCoinsAfterCurrencyChange.fulfilled, (state, action) => {
			state.loading = false;
			state.value = action.payload as currencyType;
		});
		builder.addCase(fetchCoinsAfterCurrencyChange.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchCoinsAfterCurrencyChange.rejected, (state) => {
			state.loading = false;
		});
	},
});

export const fetchCoinsAfterCurrencyChange = createAsyncThunk(
	'currency/fetchCoinsAfterCurrencyChange',
	async (currency: string, { getState, dispatch }) => {
		const { category, itemsPerPage } = (getState() as RootState).api;

		try {
			dispatch(setApiLoading(true));
			const categoryType =
				category.find((c) => c.active === true)!.value === '' ? '' : `&category=${category}`;
			const { data } = await axios(
				`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}${categoryType}&order=market_cap_desc&per_page=${itemsPerPage}&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
			);
			dispatch(setCoins(data));
			dispatch(setApiLoading(false));
			return currency;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
);

export const { setCurrency } = currencySlice.actions;

export default currencySlice.reducer;
