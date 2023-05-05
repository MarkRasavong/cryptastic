import { createSlice } from '@reduxjs/toolkit';
import { currencyType } from '../utils';

const initialState = {
	value: (localStorage.getItem('currency') as currencyType) || 'usd',
};

export const currencySlice = createSlice({
	name: 'currency',
	initialState,
	reducers: {
		setCurrency: (state, action) => {
			state.value = action.payload;
			localStorage.setItem('currency', action.payload);
		},
	},
});

export const { setCurrency } = currencySlice.actions;

export default currencySlice.reducer;
