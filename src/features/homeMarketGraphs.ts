import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '../redux/app/store';

interface CategoryProps {
	title: 'Cryptocurrency' | 'DeFi';
	value: '' | 'decentralized-finance-defi';
	active: boolean;
}

const initialState = {
	userSelection: 'Bitcoin',
};

const homeMarketGraphs = createSlice({
	name: 'homeMarketGraphs',
	initialState,
	reducers: {
		setMarketData: (state, action) => {
			state.userSelection = action.payload;
		},
	},
});

export const { setMarketData } = homeMarketGraphs.actions;

export const fetchCoinData = (): AppThunk => async (dispatch, getState) => {
	const { category, itemsPerPage } = getState().api;
	const { value: currency } = getState().currency;
	try {
		{
			/*
    dispatch(setApiLoading(true));

    API CALL

    */
		}
		{
			/*
    dispatch(setData(data)); // from API call
    dispatch(setApiLoading(false));
  */
		}
	} catch (error) {
		console.log(error);
	}
};
export default homeMarketGraphs.reducer;
