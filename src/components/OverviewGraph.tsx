import React, { useEffect, useRef, useState, Ref } from 'react';
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
	ScriptableContext,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types';

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
	const [ticks, setTicks] = useState(5);
	const [font, setFont] = useState(9);
	const lineChartRef = useRef<ChartJSOrUndefined<'line'> | null>(null);
	const barChartRef = useRef<ChartJSOrUndefined<'bar'> | null>(null);

	useEffect(() => {
		const windowWidth = window.innerWidth;

		const handleResize = () => {
			setTicks(windowWidth > 786 ? 7 : 5);
			setFont(windowWidth > 786 ? 12 : 9);

			if (lineChartRef.current) {
				lineChartRef.current.update();
			}

			if (barChartRef.current) {
				barChartRef.current.update();
			}
		};

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [lineChartRef, barChartRef, window.innerWidth]);

	const lineData = {
		labels,
		datasets: [
			{
				data: prices,
				fill: {
					target: 'origin',
				},
				backgroundColor: (context: ScriptableContext<'line'>) => {
					const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 350);
					if (prices[0] > prices[prices.length - 1]) {
						gradient.addColorStop(0, 'rgba(254, 16, 64, .5)');
						gradient.addColorStop(1, 'rgba(0, 0, 0, 0.0)');
					} else {
						gradient.addColorStop(0, 'rgba(0, 255, 95, .5)');
						gradient.addColorStop(1, 'rgba(0, 0, 0, 0.0)');
					}
					return gradient;
				},
				borderColor: () => {
					let borderColor = '';
					if (prices[0] > prices[prices.length - 1]) {
						borderColor = 'rgba(254, 16, 64, 1)';
					} else {
						borderColor = 'rgba(0, 255, 95, 1)';
					}
					return borderColor;
				},
			},
		],
	};

	const barData = {
		labels,
		datasets: [
			{
				data: volume,
				borderColor: 'rgba(33, 114, 229, 1)',
				backgroundColor: (context: ScriptableContext<'bar'>) => {
					const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 350);
					gradient.addColorStop(0, 'rgba(33, 114, 229, 1)');
					gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
					return gradient;
				},
				fill: {
					target: 'origin',
				},
			},
		],
	};

	return (
		<div className="flex justify-center w-[95%]">
			{type === 'bar' ? (
				<Bar
					className="h-[90%]"
					data={barData}
					ref={barChartRef}
					options={{
						maintainAspectRatio: false,
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
					className="h-[90%]"
					data={lineData}
					ref={lineChartRef}
					options={{
						maintainAspectRatio: false,
						elements: {
							point: {
								radius: 0,
							},
						},
						plugins: {
							legend: {
								position: 'top',
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
									lineWidth: 0,
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
