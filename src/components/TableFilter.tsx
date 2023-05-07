import React, { useState } from 'react';
import { useAppDispatch } from '../redux/app/hooks';
import { setActiveCategory } from '../features/api';

const TableFilter: React.FC = () => {
	const dispatch = useAppDispatch();
	const [activeButton, setActiveButton] = useState([
		{ title: 'Cryptocurrency', value: '', active: false },
		{ title: 'DeFi', value: 'decentralized-finance-defi', active: false },
		{ title: 'NFTs', value: 'non-fungible-tokens-nft', active: false },
		{ title: 'Metaverse', value: 'metaverse', active: false },
	]);

	const buttonOnClick = (value: string) => {
		setActiveButton((prevState) => {
			const newActiveButton = prevState.map((button) =>
				button.value === value ? { ...button, active: true } : { ...button, active: false }
			);
			const selectedButton = newActiveButton.find((button) => button.value === value);
			dispatch(setActiveCategory(selectedButton!.value));
			return newActiveButton;
		});
	};

	return (
		<div className="w-full flex justify-center items-center mb-2 dark:bg-darkNonIntComponentBg bg-lightModeWhite py-3">
			<p className="mr-2">Filter By:</p>
			{activeButton.map((button) => (
				<button
					key={`${button.title}_filterByBtn`}
					className={`px-2 py-0.5 rounded-md text-white mr-2 ${
						button.active ? 'bg-cryptoGreen' : 'bg-darkIntComponentBg'
					}`}
					onClick={() => buttonOnClick(button.value)}
				>
					{button.title}
				</button>
			))}
		</div>
	);
};

export default TableFilter;
