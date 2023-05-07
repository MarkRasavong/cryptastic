import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
import { updateActiveCategory } from '../features/api';

const TableFilter: React.FC = () => {
	const dispatch = useAppDispatch();
	const { category } = useAppSelector((state) => state.api);

	return (
		<div className="w-full flex justify-center items-center mb-2 dark:bg-darkNonIntComponentBg bg-lightModeWhite py-3">
			<p className="mr-2">Filter By:</p>
			{category.map((button) => (
				<button
					key={`${button.title}_filterByBtn`}
					className={`px-2 py-0.5 rounded-md dark:text-darkModeText text-lightModeText mr-2 ${
						button.active ? 'bg-cryptoGreen' : 'dark:bg-darkIntComponentBg bg-lightModeBgGray'
					}`}
					onClick={() => dispatch(updateActiveCategory(button.value))}
				>
					{button.title}
				</button>
			))}
		</div>
	);
};

export default TableFilter;
