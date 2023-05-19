import React, { useState } from 'react';

const DateButtons = () => {
	const dateRanges = [
		{ title: '1d', range: 1 },
		{ title: '1w', range: 7 },
		{ title: '1m', range: 30 },
		{ title: '3m', range: 90 },
		{ title: '6m', range: 180 },
		{ title: '1y', range: 365 },
	];

	return (
		<>
			{dateRanges.map((dateRanges) => (
				<button key={`dateBtn_${dateRanges.range}`}>
					<p>{dateRanges.title}</p>
				</button>
			))}
		</>
	);
};

export default DateButtons;
