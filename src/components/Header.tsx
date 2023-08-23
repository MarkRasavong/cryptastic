import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggleIcon from './icons/ThemeToggleIcon';
import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
import { toggleDarkMode } from '../features/theme';
import { fetchCoinsAfterCurrencyChange } from '../features/currency';
import SearchBar from './SearchBar';

const Header = () => {
	const dispatch = useAppDispatch();
	const { darkMode } = useAppSelector((state) => state.theme);
	const { value: currencyValue } = useAppSelector((state) => state.currency);
	const { pathname } = useLocation();

	const handleThemeToggle = () => {
		dispatch(toggleDarkMode());
	};

	const currencyOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(fetchCoinsAfterCurrencyChange(e.target.value));
	};

	const linkTabs = ['Overview', 'Portfolio'];
	const fiatCurrencies = [
		{ title: 'USD', symbol: '$', value: 'usd' },
		{ title: 'EUR', symbol: '€', value: 'eur' },
		{ title: 'GBP', symbol: '£', value: 'gbp' },
	];

	return (
		<header
			role="banner"
			className={`${
				darkMode ? 'dark:bg-darkNonIntComponentBg dark:text-darkModeText' : 'bg-lightModeWhite'
			} p-4`}
		>
			<nav className="flex justify-between items-center max-w-screen-lg mx-auto">
				<div className="flex-3">
					<div>
						<h1 className="font-bold text-2xl md:hidden">
							{pathname === '/'
								? 'Overview'
								: pathname.replace('/', '').toUpperCase().slice(0, 1) + pathname.slice(2)}
						</h1>
					</div>
					{linkTabs.map((link, idx) => (
						<Link
							to={`${link === '/' ? '/' : `/${link.toLowerCase()}`}`}
							className={`mr-8 ${
								pathname === `/${link.toLowerCase()}` &&
								'dark:bg-darkIntComponentBg bg-lightModeBgGray md:px-4 py-2 rounded-md'
							} hidden md:inline-block`}
							key={`tab-${link}_${idx}`}
						>
							{link}
						</Link>
					))}
				</div>
				<div className="flex-1 flex justify-end">
					<SearchBar />
					<select
						name="currency"
						onChange={(e) => currencyOnChange(e)}
						value={currencyValue}
						className={'componentShape px-4 mr-2 cursor-pointer'}
					>
						{fiatCurrencies.map(({ title, symbol, value }, index) => (
							<option
								value={value}
								key={`option_${title}`}
								className={`${index === 0 ? 'rounded-t-md ' : ''}${
									index === fiatCurrencies.length - 1 ? 'rounded-b-md' : ''
								} dark:text-white text-black dark:bg-darkIntComponentBg bg-lightModeBgGray`}
							>
								{symbol} {title}
							</option>
						))}
					</select>
					<button
						type="button"
						onClick={handleThemeToggle}
						className="componentShape p-2 focus:ring-darkModeText"
					>
						<ThemeToggleIcon />
					</button>
				</div>
			</nav>
		</header>
	);
};

export default Header;
