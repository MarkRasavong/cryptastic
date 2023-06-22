import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
import { setActiveSelectedDate, fetchGraphData } from '../features/homeMarketGraphs';

const DateButtons = () => {
	const dispatch = useAppDispatch();
	const { selectedDate } = useAppSelector((state) => state.homeMarketGraphs);

	const handleDateClick = (date: string) => {
		dispatch(setActiveSelectedDate(date));
		dispatch(fetchGraphData());
	};

	return (
		<>
			{selectedDate.map((dateRanges) => (
				<button
					key={`dateBtn_${dateRanges.range}`}
					className={`${dateRanges.active && 'bg-sliderGreen px-2 h-full rounded-sm'}`}
					onClick={() => handleDateClick(dateRanges.title)}
				>
					<p className="text-xs">{dateRanges.title}</p>
				</button>
			))}
		</>
	);
};

export default DateButtons;
