import React from 'react';
import {
	Chart,
	CategoryScale,
	Legend,
	LineElement,
	LinearScale,
	PointElement,
	Title,
	Tooltip,
	ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { CoinGeckoApiProps } from '../constants';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface SmallGraphProps {
	className?: string;
	graphData: CoinGeckoApiProps['sparkline_in_7d']['price'];
}

const SmallGraph: React.FC<SmallGraphProps> = (props) => {
	let graphData: number[] = [];
	let graphIdxs: number[] = [];

	props.graphData.forEach((data, idx) => {
		if (idx % 2 === 0 && idx % 3 === 0) {
			graphIdxs = [...graphIdxs, idx];
			graphData = [...graphData, data];
		}
		return graphIdxs && graphData;
	});

	const lastItem = props.graphData[props.graphData.length - 1];
	const secondLastItem = props.graphData[props.graphData.length - 2];

	const data: ChartData<'line', number[], number> = {
		labels: graphIdxs,
		datasets: [
			{
				data: graphData,
				tension: 0.4,
				borderColor: '#fe1040',
				backgroundColor: '#fe1040',
			},
		],
	};

	data.datasets[0].borderColor = secondLastItem - lastItem > 0 ? '#00ff00' : '#ff0000';
	data.datasets[0].backgroundColor = secondLastItem - lastItem > 0 ? '#00ff00' : '#ff0000';

	return (
		<div className={`h-16 w-28 ${props.className}`}>
			<Line
				data={data}
				options={{
					responsive: true,
					elements: {
						point: { radius: 0 },
					},
					maintainAspectRatio: false,
					plugins: {
						legend: { display: false },
						title: { display: false },
					},
					scales: {
						x: {
							border: { display: false },
							grid: {
								display: false,
							},
							ticks: {
								display: false,
								maxTicksLimit: 5,
							},
						},
						y: {
							border: { display: false },
							grid: { display: false },
							ticks: {
								display: false,
								maxTicksLimit: 5,
							},
						},
					},
				}}
			/>
		</div>
	);
};

export default SmallGraph;
