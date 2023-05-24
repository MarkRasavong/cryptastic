import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '../redux/app/store';
import axios from 'axios';

interface CryptoIdData {
	current_price: {
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

interface FormatBarGraphInterface {
	volumeLabels: string[];
	volumePrices: number[];
}

const initialState = {
	userSelection: 'bitcoin',
	loading: false,
	labels: [] as string[],
	prices: [] as number[],
	volumeLabels: [] as string[],
	volumePrices: [] as number[],
	currentPrice: 0,
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
		setVolumeLabels: (state, action) => {
			state.volumeLabels = action.payload;
		},
		setVolumePrices: (state, action) => {
			state.volumePrices = action.payload;
		},
		setCoinCurrentPrice: (state, action) => {
			state.currentPrice = action.payload;
		},
		setCoinLastUpdated: (state, action) => {
			state.lastUpdated = action.payload;
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
	setVolumeLabels,
	setVolumePrices,
	setCoinCurrentPrice,
	setCoinLastUpdated,
	setActiveSelectedDate,
} = homeMarketGraphs.actions;

export const fetchLineGraphData =
	(type: 'bar' | 'line'): AppThunk =>
	async (dispatch, getState) => {
		const { value: currency } = getState().currency;
		const { userSelection } = getState().homeMarketGraphs;

		try {
			dispatch(setApiLoading(true));

			const data = (
				await axios(
					`https://api.coingecko.com/api/v3/coins/${userSelection}/market_chart?vs_currency=${currency}&days=7`
				)
			).data as CryptoData;

			if (type === 'line') {
				const formatData: FormatLineGraphInterface = data.prices.reduce(
					(acc, [label, price]) => ({
						labels: [...acc.labels, new Date(label).toLocaleDateString()],
						prices: [...acc.prices, price],
					}),
					{ labels: [], prices: [] } as FormatLineGraphInterface
				);

				dispatch(setLabels(formatData.labels));
				dispatch(setPrices(formatData.prices));
			}
			if (type === 'bar') {
				const formatData: FormatBarGraphInterface = data.total_volumes.reduce(
					(acc, [label, price]) => ({
						volumeLabels: [...acc.volumeLabels, new Date(label).toLocaleDateString()],
						volumePrices: [...acc.volumePrices, price],
					}),
					{ volumeLabels: [], volumePrices: [] } as FormatBarGraphInterface
				);
				dispatch(setVolumeLabels(formatData.volumeLabels));
				dispatch(setVolumePrices(formatData.volumePrices));
			}
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

		dispatch(setCoinCurrentPrice(data.current_price[currency]));
		dispatch(setCoinLastUpdated(data.last_updated));
	} catch (error) {
		console.log(error);
	}
};

export default homeMarketGraphs.reducer;
