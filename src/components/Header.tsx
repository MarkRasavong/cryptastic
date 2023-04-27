import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggleIcon from './icons/ThemeToggleIcon';
import SearchIcon from './icons/SearchIcon';
import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
import { toggleDarkMode } from '../features/theme';

const Header = () => {
	const { pathname } = useLocation();
	const dispatch = useAppDispatch();
	const { darkMode } = useAppSelector((state) => state.theme);

	const handleThemeToggle = () => {
		dispatch(toggleDarkMode());
	};

	const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// do something with searchQuery
	};

	const linkTabs = ['Coins', 'Portfolio'];
	const fiatCurrencies = [
		{ value: 'USD', symbol: '$' },
		{ value: 'EUR', symbol: '€' },
		{ value: 'GBP', symbol: '£' },
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
							{pathname === '/coins' ? 'Coins' : 'Portfolio'}
						</h1>
					</div>
					{linkTabs.map((link, idx) => (
						<Link
							to={`/${link.toLowerCase()}`}
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
					<form
						onSubmit={handleSearchSubmit}
						className="flex items-center w-3/4 justify-end relative"
					>
						<input
							type="text"
							placeholder="Search..."
							className="componentShape hidden md:inline-block md:w-3/4 py-2 md:px-4 px-0 md:mr-2 dark:focus:ring-darkModeText"
							style={{ paddingLeft: '36px' }}
						/>
						<SearchIcon className="hidden md:inline-block absolute md:w-4 md:left-20 md:ml-7 lg:left-40 lg:ml-0.5 lg:mr-5" />
					</form>
					<select name="currency" className={'componentShape px-4 py-2 mr-2 cursor-pointer'}>
						{fiatCurrencies.map(({ value, symbol }, index) => (
							<option
								value={value}
								key={value}
								className={`${index === 0 ? 'rounded-t-md ' : ''}${
									index === fiatCurrencies.length - 1 ? 'rounded-b-md' : ''
								}`}
							>
								{symbol} {value}
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
