import { useState, useEffect, useMemo, useRef } from 'react';
import axios from 'axios';
import SearchIcon from './icons/SearchIcon';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';

interface Coin {
	id: string;
	name: string;
	api_symbol: string;
	symbol: string;
	market_cap_rank: number | null;
	thumb: string;
	large: string;
}

const SearchBar = () => {
	const [inputValue, setInputValue] = useState('');
	const [results, setResults] = useState<Coin[]>([]);
	const [error, setError] = useState('');

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
			setError('An error occurred while searching');
		}
	};

	const debouncedChangeHandler = useMemo(() => debounce(handleSearch, 500), []);

	useEffect(() => {
		return () => {
			debouncedChangeHandler.cancel();
		};
	}, [debouncedChangeHandler]);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (inputValue.length > 0 && results.length > 0) {
			navigate(`/coin/${results[0].id}`);
		}
		setInputValue('');
		setResults([]);
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

	const handleClick = () => {
		setInputValue('');
		setResults([]);
	};

	const handleOutsideClick = (e: MouseEvent) => {
		if (resultsRef.current && !resultsRef.current.contains(e.target as Node)) {
			setResults([]);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleOutsideClick);
		return () => {
			document.removeEventListener('click', handleOutsideClick);
		};
	}, []);

	return (
		<div className="flex flex-col w-full items-end">
			<div className="w-3/4 relative">
				<form onSubmit={onSubmit} className="flex items-center justify-end">
					<input
						type="text"
						placeholder="Search..."
						className="componentShape hidden md:inline-block w-full py-2 md:px-4 px-0 md:mr-2 dark:focus:ring-darkModeText"
						style={{ paddingLeft: '36px' }}
						value={inputValue}
						onChange={onChange}
					/>
					<SearchIcon className="hidden md:inline-block absolute md:w-4 md:left-0 md:ml-3 lg:left-2 lg:ml-0.5 lg:mr-5 top-1/2 transform -translate-y-1/2" />
				</form>
				{results.length > 0 && (
					<div
						ref={resultsRef}
						className="absolute bottom componentShape w-full hidden md:block p-2 z-50 cursor-pointer"
					>
						{results.map((el) => (
							<div
								key={el.id}
								className="flex items-center justify-between py-2 px-4 hover:bg-gray-100 dark:hover:bg-darkNonIntComponentBg"
								onClick={handleClick}
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
		</div>
	);
};

export default SearchBar;
