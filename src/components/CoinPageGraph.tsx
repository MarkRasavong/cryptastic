import React, { useEffect, useState } from 'react';
import { CoinPageData } from '../pages/CoinPage';
import { useAppSelector } from '../redux/app/hooks';
import { timeConverter } from '../utils';
import axios from 'axios';
import { CryptoData, FormatLineGraphInterface } from '../features/homeMarketGraphs';
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

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface SpecificCoinGraphStatisticsProps {
	profile: CoinPageData;
}

interface DateRange {
	title: string;
	range: number;
	active: boolean;
}

const CoinPageGraph = ({ profile }: SpecificCoinGraphStatisticsProps) => {
	const currency = useAppSelector((state) => state.currency.value);
	const { darkMode } = useAppSelector((state) => state.theme);
	const [dateRange, setDateRange] = useState(1);
	const [labels, setLabels] = useState<string[]>([]);
	const [prices, setPrices] = useState<number[]>([]);
	const [isLoading] = useState(false);
	const [dateRanges, setDateRanges] = useState<DateRange[]>([
		{ title: '1d', range: 1, active: true },
		{ title: '1w', range: 7, active: false },
		{ title: '1m', range: 30, active: false },
		{ title: '3m', range: 90, active: false },
		{ title: '6m', range: 180, active: false },
		{ title: '1y', range: 365, active: false },
	]);

	const getGraphData = async () => {
		try {
			const data = (
				await axios(
					`https://api.coingecko.com/api/v3/coins/${profile.name.toLowerCase()}/market_chart?vs_currency=${currency}&days=${dateRange}`
				)
			).data as CryptoData;

			const formatData: FormatLineGraphInterface = data.prices.reduce(
				(acc, [label, price]) => ({
					labels: [
						...acc.labels,
						new Date(label).toLocaleDateString('en-us', {
							month: 'short',
							day: 'numeric',
						}),
					],
					prices: [...acc.prices, price],
				}),
				{ labels: [], prices: [] } as FormatLineGraphInterface
			);
			setLabels(formatData.labels);
			setPrices(formatData.prices);
		} catch (err) {
			console.log('Location Error:', err);
		}
	};

	const formatData = (price: number[], label: string[]) => {
		return {
			labels: label,
			datasets: [
				{
					data: price,
					fill: true,
					tension: 0.4,
					borderColor: darkMode ? '#2c2f36' : '#d3d0c9',
					backgroundColor: darkMode ? '#1f2128' : '#d3d0c9',
					pointHoverRadius: 5,
					pointHoverBackgroundColor: '#06D554',
				},
			],
		};
	};

	const setRange = (dateRange: number) => {
		setDateRange(dateRange);
	};

	const hasData = () => prices.length;

	useEffect(() => {
		getGraphData();
	}, [currency, dateRange]);

	const graphData = formatData(prices, labels);
	console.log(graphData);
	const hasGraph = !isLoading && prices;

	const options = {
		responsive: true,
		elements: {
			point: {
				radius: 0,
			},
		},
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: false,
			},
		},
		scales: {
			x: {
				grid: {
					axis: 'x',
					display: false,
					drawBorder: false,
					lineWidth: 0,
				},
				ticks: {
					beginAtZero: true,
					display: false,
					maxTicksLimit: 5,
				},
			},
			y: {
				grid: {
					axis: 'y',
					display: false,
					drawBorder: false,
				},
				ticks: {
					beginAtZero: true,
					display: false,
					maxTicksLimit: 5,
				},
			},
		},
	};

	const DateRangeSelector = () => {
		const handleRangeChange = (range: string) => {
			const updatedDateRanges = dateRanges.map((item) => ({
				...item,
				active: item.title === range,
			}));
			setDateRanges(updatedDateRanges);
			setDateRange(updatedDateRanges.find((item) => item.active === true)?.range as number);
		};

		return (
			<div className="flex justify-center">
				{dateRanges.map((range) => (
					<label
						key={range.title}
						className={`flex items-center space-x-2 cursor-pointer rounded-lg p-2 `}
					>
						<input
							type="radio"
							value={range.title}
							checked={range.active}
							onChange={() => handleRangeChange(range.title)}
							className={`scale-[2] mobile:scale-1 mobile:mr-0 mr-1 ${
								range.active ? 'crypto-pg-radio-input' : ''
							}`}
						/>
						<span className="mobile:text-xs">{range.title}</span>
					</label>
				))}
			</div>
		);
	};

	return (
		<>
			<DateRangeSelector />
			<div className="w-full flex justify-center">
				<Line options={options} data={graphData} />
			</div>
		</>
	);
};

export default CoinPageGraph;
