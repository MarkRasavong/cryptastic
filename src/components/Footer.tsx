import React from 'react';
import { GithubIcon } from './icons/GithubIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/app/hooks';
import { OverviewIcon } from './icons/mobile/OverviewIcon';
import { PortfolioIcon } from './icons/mobile/PortfolioIcon';
import { SearchIconMobile } from './icons/mobile/SearchIconMobile';
import { SummaryIcon } from './icons/mobile/SummaryIcon';

const Footer = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const { darkMode: isDarkMode } = useAppSelector((state) => state.theme);

	const mobileMenuLinks = [
		{
			name: 'Overview',
			link: '/',
			darkModeIcon: <OverviewIcon darkMode className="w-12" />,
			lightModeIcon: <OverviewIcon className="w-12" />,
			selectedIcon: <OverviewIcon selected className="w-12" />,
		},
		{
			name: 'Portfolio',
			link: '/portfolio',
			darkModeIcon: <PortfolioIcon darkMode className="w-12" />,
			lightModeIcon: <PortfolioIcon className="w-12" />,
			selectedIcon: <PortfolioIcon selected className="w-12" />,
		},
		{
			name: 'Summary',
			link: '/coin/:id',
			darkModeIcon: <SummaryIcon darkMode className="w-12" />,
			lightModeIcon: <SummaryIcon className="w-12" />,
			selectedIcon: <SummaryIcon selected className="w-12" />,
		},
		{
			name: 'Search',
			link: '/search',
			darkModeIcon: <SearchIconMobile darkMode className="w-9" />,
			lightModeIcon: <SearchIconMobile className="w-9" />,
			selectedIcon: <SearchIconMobile selected className="w-9" />,
		},
	];

	return (
		<footer className="mobile:fixed bottom-0 50 flex justify-center w-full text-center dark:bg-darkIntComponentBg bg-lightModeBgFooterMobile py-4">
			<div className="hidden md:flex">
				<a href="https://github.com/drazomo" target="_blank" rel="noopener noreferrer">
					<GithubIcon className="w-7 rounded-md mb-1 mr-4" />
					<span className="sr-only">GitHub profile</span>
				</a>
				<a href="https://linkedin.com/in/markrasavong" target="_blank" rel="noopener noreferrer">
					<LinkedInIcon className="w-7 rounded-md mb-1" />
					<span className="sr-only">LinkedIn profile</span>
				</a>
			</div>
			<div className="w-full flex justify-around md:hidden">
				{mobileMenuLinks.map(({ name, darkModeIcon, lightModeIcon, selectedIcon, link }) => {
					if (link !== '/coin/:id') {
						return (
							<Link to={link} key={`mobileLinkTab_${name}`}>
								{pathname === link ? selectedIcon : isDarkMode ? darkModeIcon : lightModeIcon}
							</Link>
						);
					} else {
						return (
							<span key={`mobileLinkTab_${name}`}>
								{pathname.startsWith('/coin/') && !pathname.startsWith('/coin/:id')
									? selectedIcon
									: isDarkMode
									? darkModeIcon
									: lightModeIcon}
							</span>
						);
					}
				})}
			</div>
		</footer>
	);
};

export default Footer;
