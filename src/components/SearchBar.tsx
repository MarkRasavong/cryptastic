import { useState, useEffect, useMemo } from 'react';
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

	console.log(results);

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
					<SearchIcon className="hidden md:inline-block absolute md:w-4 md:left-20 md:ml-7 lg:left-40 lg:ml-0.5 lg:mr-5 top-1/2 transform -translate-y-1/2" />
				</form>
				<div className="absolute bottom componentShape w-full hidden md:block py-6"></div>
			</div>
		</div>
	);
};

export default SearchBar;
