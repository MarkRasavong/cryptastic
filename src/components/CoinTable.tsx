import React, { useState } from 'react';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { useAppSelector } from '../redux/app/hooks';

export const CoinTable: React.FC = () => {
	const currency = useAppSelector((state) => state.currency.value);
	const [filterSelection, setFilterSelection] = useState({
		marketCapRank: {
			id: 1,
			title: '#',
			prop: 'market_cap_rank',
			upArrow: false,
		},
		name: { id: 2, title: 'Name', prop: 'name', upArrow: false },
		price: { id: 3, title: 'Price', prop: 'current_price', upArrow: false },
		hour: {
			id: 4,
			title: '1h%',
			prop: 'price_change_percentage_1h_in_currency',
			upArrow: false,
		},
		day: {
			id: 5,
			title: '24h%',
			prop: 'price_change_percentage_24h_in_currency',
			upArrow: false,
		},
		week: {
			id: 6,
			title: '7d%',
			prop: 'price_change_percentage_7d_in_currency',
			upArrow: false,
		},
	});

	const setFilterArrowDirection = (id: number) => {
		const filter = Object.values(filterSelection).map((item) => {
			if (item.id === id) {
				return { ...item, upArrow: !item.upArrow };
			} else {
				return { ...item, upArrow: false };
			}
		});
		setFilterSelection(Object(filter));
	};

	return (
		<>
			<div className="overflow-x-auto rounded-md table-fixed w-full">
				<table className="bg-darkNonIntComponentBg">
					<thead>
						<tr>
							{Object.values(filterSelection).map(({ title, id, prop, upArrow }) => (
								<th
									className="py-2 px-4 w-max"
									key={id}
									onClick={() => setFilterArrowDirection(id)}
								>
									<span className="flex items-center">
										<span className="mr-1">{title}</span>
										{upArrow ? (
											<FaSortAmountUp size={'0.8rem'} />
										) : (
											<FaSortAmountDown size={'0.8rem'} />
										)}
									</span>
								</th>
							))}
							<th className="py-2 px-4 w-max">24h Volume/Market Cap</th>
							<th className="py-2 px-4 w-max">Circulating/Total Supply</th>
							<th className="py-2 px-4 w-max">Last 7d</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="py-2 px-4 border-b border-gray-300">1</td>
							<td className="py-2 px-4 border-b border-gray-300">2</td>
							<td className="py-2 px-4 border-b border-gray-300">3</td>
							<td className="py-2 px-4 border-b border-gray-300">4</td>
							<td className="py-2 px-4 border-b border-gray-300">5</td>
							<td className="py-2 px-4 border-b border-gray-300">6</td>
							<td className="py-2 px-4 border-b border-gray-300">7</td>
							<td className="py-2 px-4 border-b border-gray-300">8</td>
							<td className="py-2 px-4 border-b border-gray-300">9</td>
						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
};
