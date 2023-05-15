import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '../redux/app/store';
import axios from 'axios';

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
	},
});

export const {
	setMarketData,
	setApiLoading,
	setLabels,
	setPrices,
	setVolumeLabels,
	setVolumePrices,
} = homeMarketGraphs.actions;

export const fetchLineGraphData =
	(type: 'bar' | 'line'): AppThunk =>
	async (dispatch, getState) => {
		const { value: currency } = getState().currency;
		const { userSelection } = getState().homeMarketGraphs;

		try {
			dispatch(setApiLoading(true));

			const data = (await axios(
				`https://api.coingecko.com/api/v3/coins/${userSelection}/market_chart?vs_currency=${currency}&days=7`
			)) as CryptoData;

			if (type === 'line') {
				const formatData: FormatLineGraphInterface = data.prices.reduce(
					(acc, [label, price]) => ({
						labels: [...acc.labels, new Date(label).toLocaleDateString()],
						prices: [...acc.prices, price],
					}),
					{ labels: [], prices: [] } as FormatLineGraphInterface
				);

				setLabels(formatData.labels);
				setPrices(formatData.prices);
			}
			if (type === 'bar') {
				const formatData: FormatBarGraphInterface = data.total_volumes.reduce(
					(acc, [label, price]) => ({
						volumeLabels: [...acc.volumeLabels, new Date(label).toLocaleDateString()],
						volumePrices: [...acc.volumePrices, price],
					}),
					{ volumeLabels: [], volumePrices: [] } as FormatBarGraphInterface
				);
				setVolumeLabels(formatData.volumeLabels);
				setVolumePrices(formatData.volumePrices);
			}
			setApiLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

export default homeMarketGraphs.reducer;
