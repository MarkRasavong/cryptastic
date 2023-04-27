import React, { useState } from 'react';
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

	return (
		<header
			className={`${
				darkMode
					? 'dark:bg-darkNonIntComponentBg dark:text-darkModeText'
					: 'bg-lightModeWhite'
			} p-4`}
		>
			<nav className="flex justify-between items-center max-w-screen-lg mx-auto">
				<div className="flex-3">
					<Link
						to="/coins"
						className={`mr-8 ${
							pathname === '/coins' &&
							'dark:bg-darkIntComponentBg bg-lightModeBgGray md:px-4 py-2 rounded-md'
						}`}
					>
						Coins
					</Link>
					<Link
						to="/portfolio"
						className={`
							${
								pathname === '/portfolio' &&
								'dark:bg-darkIntComponentBg bg-lightModeBgGray md:px-4 py-2 rounded-md'
							}`}
					>
						Portfolio
					</Link>
				</div>
				<div className="flex-1 flex justify-end">
					<form
						onSubmit={handleSearchSubmit}
						className="flex items-center w-3/4 justify-end relative"
					>
						<input
							type="text"
							placeholder="Search..."
							className="dark:bg-darkIntComponentBg dark:text-darkModeText bg-lightModeBgGray w-3/4 rounded-md py-2 md:px-4 px-0 md:mr-2 focus:outline-none focus:ring-2 focus:ring-darkModeText focus:border-transparent"
							style={{ paddingLeft: '30px' }}
						/>
						<SearchIcon fill="#000" className="absolute w-4 left-40 ml-0.5" />
					</form>
					<select
						name="currency"
						className="dark:bg-darkIntComponentBg dark:text-darkModeText bg-lightModeBgGray rounded-md px-4 py-2  md:mr-2 focus:outline-none focus:ring-2 focus:ring-darkModeText focus:border-transparent cursor-pointer"
					>
						<option value="USD">
							<div className="dark:bg-darkNonIntComponentBg rounded-full p-2 ">
								$
							</div>{' '}
							USD
						</option>
						<option value="EUR">
							<span className="dark:bg-darkNonIntComponentBg rounded-full p-2">
								€
							</span>{' '}
							EUR
						</option>
						<option value="GBP">
							<div className="dark:bg-darkNonIntComponentBg rounded-full p-2 ">
								£
							</div>{' '}
							GBP
						</option>
					</select>
					<button
						type="button"
						onClick={handleThemeToggle}
						className="dark:bg-darkIntComponentBg dark:text-darkModeText bg-lightModeBgGray rounded-md p-2  focus:outline-none focus:ring-2 focus:ring-darkModeText focus:border-transparent"
					>
						<ThemeToggleIcon fill="#000" />
					</button>
				</div>
			</nav>
		</header>
	);
};

export default Header;
