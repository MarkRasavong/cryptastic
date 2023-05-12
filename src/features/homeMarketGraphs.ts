import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '../redux/app/store';
import axios from 'axios';

interface CryptoData {
	prices: [number, number][];
	market_caps: [number, number][];
	total_volumes: [number, number][];
}

interface FormatDataInterface {
	labels: string[];
	prices: number[];
}

const initialState = {
	userSelection: 'bitcoin',
	loading: false,
	labels: [] as string[],
	prices: [] as number[],
};

const homeMarketGraphs = createSlice({
	name: 'homeMarketGraphs',
	initialState,
	reducers: {
		setMarketData: (state, action) => {
			state.userSelection = action.payload;
		},
		setApiLoading: (state, action) => {
			state.loading = action.payload;
		},
		setLabels: (state, action) => {
			state.labels = action.payload;
		},
		setPrices: (state, action) => {
			state.prices = action.payload;
		},
	},
});

export const { setMarketData, setApiLoading, setLabels, setPrices } = homeMarketGraphs.actions;

export const fetchLineGraphData = (): AppThunk => async (dispatch, getState) => {
	const { value: currency } = getState().currency;
	const { userSelection } = getState().homeMarketGraphs;

	try {
		dispatch(setApiLoading(true));

		const data = (await axios(
			`https://api.coingecko.com/api/v3/coins/${userSelection}/market_chart?vs_currency=${currency}&days=7`
		)) as CryptoData;

		const formatData: FormatDataInterface = data.prices.reduce(
			(acc, [label, price]) => ({
				labels: [...acc.labels, new Date(label).toLocaleDateString()],
				prices: [...acc.prices, price],
			}),
			{ labels: [], prices: [] } as FormatDataInterface
		);

		setLabels(formatData.labels);
		setPrices(formatData.prices);

		setApiLoading(false);
	} catch (error) {
		console.log(error);
	}
};
export default homeMarketGraphs.reducer;
