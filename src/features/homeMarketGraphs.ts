import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '../redux/app/store';
import axios from 'axios';

interface CryptoIdData {
	current_price: {
		eur: number;
		usd: number;
		gbp: number;
	};
	total_volume: {
		eur: number;
		usd: number;
		gbp: number;
	};
	last_updated: string;
}
interface CryptoData {
	prices: [number, number][];
	market_caps: [number, number][];
	total_volumes: [number, number][];
}

interface FormatLineGraphInterface {
	labels: string[];
	prices: number[];
}

const initialState = {
	userSelection: 'bitcoin',
	loading: false,
	labels: [] as string[],
	prices: [] as number[],
	volume: [] as number[],
	currentPrice: 0,
	totalVolume: 0,
	lastUpdated: '',
	selectedDate: [
		{ title: '1d', range: 1, active: true },
		{ title: '1w', range: 7, active: false },
		{ title: '1m', range: 30, active: false },
		{ title: '3m', range: 90, active: false },
		{ title: '6m', range: 180, active: false },
		{ title: '1y', range: 365, active: false },
	],
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
		setVolume: (state, action) => {
			state.volume = action.payload;
		},
		setCoinCurrentPrice: (state, action) => {
			state.currentPrice = action.payload;
		},
		setCoinLastUpdated: (state, action) => {
			state.lastUpdated = action.payload;
		},
		setCoinTotalVolume: (state, action) => {
			state.totalVolume = action.payload;
		},
		setActiveSelectedDate: (state, action) => {
			state.selectedDate = state.selectedDate.map((date) => {
				if (date.title === action.payload) {
					return { ...date, active: true };
				} else {
					return { ...date, active: false };
				}
			});
		},
	},
});

export const {
	setMarketData,
	setApiLoading,
	setLabels,
	setPrices,
	setVolume,
	setCoinCurrentPrice,
	setCoinTotalVolume,
	setCoinLastUpdated,
	setActiveSelectedDate,
} = homeMarketGraphs.actions;

export const fetchGraphData = (): AppThunk => async (dispatch, getState) => {
	const { value: currency } = getState().currency;
	const { userSelection, selectedDate } = getState().homeMarketGraphs;

	try {
		dispatch(setApiLoading(true));

		const data = (
			await axios(
				`https://api.coingecko.com/api/v3/coins/${userSelection}/market_chart?vs_currency=${currency}&days=${
					selectedDate.find((date) => date.active === true)?.range
				}`
			)
		).data as CryptoData;

		const { prices, total_volumes } = data;

		console.log(prices);

		const formatData: FormatLineGraphInterface = prices.reduce(
			(acc, [label, price]) => ({
				labels: [
					...acc.labels,
					new Date(label).toLocaleDateString('en-us', {
						month: 'short',
						day: 'numeric',
					}),
				],
				prices: [...acc.prices, price],
			}),
			{ labels: [], prices: [] } as FormatLineGraphInterface
		);

		const formatVolume = total_volumes.reduce(
			(acc, [date, volValue]) => [...acc, volValue],
			[] as number[]
		);

		dispatch(setLabels(formatData.labels));
		dispatch(setPrices(formatData.prices));
		dispatch(setVolume(formatVolume));

		setApiLoading(false);
	} catch (error) {
		console.log(error);
	}
};

export const fetchCoinById = (): AppThunk => async (dispatch, getState) => {
	const { value: currency } = getState().currency;
	const { userSelection } = getState().homeMarketGraphs;

	try {
		const data = (await axios(`https://api.coingecko.com/api/v3/coins/${userSelection}/`)).data
			.market_data as CryptoIdData;

		dispatch(setCoinTotalVolume(data.total_volume[currency]));
		dispatch(setCoinCurrentPrice(data.current_price[currency]));
		dispatch(setCoinLastUpdated(data.last_updated));
	} catch (error) {
		console.log(error);
	}
};

export default homeMarketGraphs.reducer;
