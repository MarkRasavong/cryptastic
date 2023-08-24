import React, { useEffect, useMemo, useRef, useState } from 'react';
import Error404 from './Error404';
import { debounce } from 'lodash';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Coin } from '../components/SearchBar';

const MobileSearchPage = () => {
	const [inputValue, setInputValue] = useState('');
	const [results, setResults] = useState<Coin[]>([]);
	const [resultClicked, setResultClicked] = useState(false);
	// mobileSearch state to highlight summary page search bar

	const navigate = useNavigate();
	const resultsRef = useRef<HTMLDivElement>(null);

	const handleSearch = async (value: string) => {
		try {
			const { data } = await axios.get(
				`https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(value)}`
			);
			const coins = data?.coins
				?.filter(
					(el: Coin) =>
						el.id.startsWith(value) || el.name.startsWith(value) || el.symbol.startsWith(value)
				)
				?.slice(0, 10);
			setResults(coins);
		} catch (err) {
			console.log('An error occurred while searching');
		}
	};

	const debouncedChangeHandler = useMemo(() => debounce(handleSearch, 500), []);

	useEffect(() => {
		return () => {
			debouncedChangeHandler.cancel();
		};
	}, [debouncedChangeHandler]);

	const handleClear = () => {
		setInputValue('');
		setResults([]);
	};

	const onSubmit = (
		e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		e.preventDefault();
		if (inputValue.length > 0 && results.length > 0 && !resultClicked) {
			navigate(`/coin/${results[0].id}`);
		}
		handleClear();
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (value.length <= 0) {
			setResults([]);
		} else {
			debouncedChangeHandler(value);
		}
		setInputValue(value);
	};

	const handleOutsideClick = (e: MouseEvent) => {
		if (!inputValue && resultsRef.current && !resultsRef.current.contains(e.target as Node)) {
			handleClear();
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleOutsideClick);
		return () => {
			document.removeEventListener('click', handleOutsideClick);
		};
	}, []);

	return (
		<div className="min-h-screen p-4 md:p-8 dark:bg-darkBg bg-lightModeBgGray flex justify-center">
			<div className="md:hidden w-11/12">
				<form onSubmit={onSubmit} className="flex-col flex">
					<input
						type="text"
						placeholder="Search..."
						value={inputValue}
						onChange={onChange}
						className="w-full py-2 px-4 rounded border border-gray-300 text-lightModeText"
					/>
					<button className="mt-2 w-full py-2 px-4 bg-blue-500 text-white rounded">Search</button>
				</form>
				{results.length > 0 && (
					<div
						ref={resultsRef}
						className="componentShape block md:hidden p-2 cursor-pointer w-full mt-4"
					>
						{results.map((el) => (
							<div
								key={el.id}
								className="flex items-center justify-between p-4 hover:bg-gray-100 dark:hover:bg-darkNonIntComponentBg w-full"
								onClick={(e) => {
									setResultClicked(true);
									onSubmit(e);
								}}
							>
								<div className="flex items-center">
									<img src={el.thumb} alt={el.name} className="w-6 h-6 mr-2" />
									<span>{el.name}</span>
								</div>
								<span className="text-gray-400">{el.symbol.toUpperCase()}</span>
							</div>
						))}
					</div>
				)}
			</div>
			<div className="hidden md:block mt-4">
				<Error404 />
			</div>
		</div>
	);
};

export default MobileSearchPage;
