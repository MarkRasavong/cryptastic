import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: localStorage.getItem('currency') || 'usd',
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
