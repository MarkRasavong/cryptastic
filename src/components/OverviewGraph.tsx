import React from 'react';
import { useAppSelector } from '../redux/app/hooks';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Filler,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Filler,
	Title,
	Tooltip,
	Legend
);

interface OverviewGraphProps {
	type: 'bar' | 'line';
}

const OverviewGraph: React.FC<OverviewGraphProps> = ({ type }) => {
	const { labels, prices, volume } = useAppSelector((state) => state.homeMarketGraphs);

	const windowWidth = window.innerWidth;

	const font = windowWidth > 786 ? 12 : 9;
	const ticks = windowWidth > 786 ? 7 : 5;

	const data = {
		labels,
		datasets: [
			{
				data: type === 'bar' ? prices : volume,
				backgroundColor: '#00BFA6',
				borderColor: 'rgba(33, 114, 229, 1)',
			},
		],
	};

	return (
		<div className="w-[90%] flex justify-center">
			{type === 'bar' ? (
				<Bar
					className="w-full"
					data={data}
					options={{
						plugins: {
							legend: {
								display: false,
							},
							title: { display: false },
						},
						scales: {
							y: {
								axis: 'y',
								display: false,
							},

							x: {
								axis: 'x',
								grid: {
									display: false,
									drawTicks: false,
								},
								ticks: {
									maxRotation: 0,
									minRotation: 0,
									autoSkip: true,
									maxTicksLimit: ticks,
									padding: 10,
									align: 'start',
									font: {
										size: font,
									},
								},
							},
						},
					}}
				/>
			) : (
				<Line
					className="w-full"
					data={data}
					options={{
						plugins: {
							legend: {
								display: false,
							},
							title: { display: false },
						},
						scales: {
							y: {
								axis: 'y',
								display: false,
							},

							x: {
								axis: 'x',
								grid: {
									display: false,
									drawTicks: false,
								},
								ticks: {
									maxRotation: 0,
									minRotation: 0,
									autoSkip: true,
									maxTicksLimit: ticks,
									padding: 10,
									align: 'start',
									font: {
										size: font,
									},
								},
							},
						},
					}}
				/>
			)}
		</div>
	);
};

export default OverviewGraph;
