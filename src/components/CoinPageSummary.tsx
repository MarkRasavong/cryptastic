import React from 'react';
import { CoinPageData } from '../pages/CoinPage';
import { FaLink } from 'react-icons/fa';

interface CoinPageSummaryProps {
	profile: CoinPageData;
}

const CoinPageSummary = ({ profile }: CoinPageSummaryProps) => {
	return (
		<>
			<div
				className="bg-lightModeWhite dark:bg-darkNonIntComponentBg flex flex-col justify-center rounded-lg 
			sm:px-6 sm:py-12 w-2/4 py-10 sm:w-fit items-center"
			>
				<div>
					<div className="bg-lightModeBgGray dark:bg-darkIntComponentBg rounded-lg justify-center flex p-4">
						<img src={profile.image.thumb} alt={`${profile.name} logo`} />
					</div>
					<div className="text-sm mt-1 text-center">
						<span id="profile_name_cryptoTitle">
							{profile.name}
							{profile.name.length > 7 && (
								<>
									<br />
								</>
							)}
						</span>
						<span id="profile_symbol_cryptoTitle">
							{profile.symbol.length !== 0 && ` (${profile.symbol.toUpperCase()})`}
						</span>
					</div>
				</div>
				<div className="hidden bg-lightModeWhite dark:bg-darkNonIntComponentBg dark:text-white rounded-lg mt-2 p-4 sm:flex">
					<a href={profile.links.homepage[0]} target="_blank" rel="noreferrer" className="mr-4">
						<FaLink />
					</a>
					<a href={profile.links.homepage[0]} target="_blank" rel="noreferrer" className="text-xs">
						{profile.links.homepage[0].slice(8, -1)}
					</a>
				</div>
			</div>
			<div className="sm:hidden bg-lightModeWhite dark:bg-darkNonIntComponentBg dark:text-white rounded-lg my-6 p-4 flex sm:px-6 sm:py-12 w-2/4 py-4">
				<a href={profile.links.homepage[0]} target="_blank" rel="noreferrer" className="mr-4">
					<FaLink />
				</a>
				<a href={profile.links.homepage[0]} target="_blank" rel="noreferrer" className="text-xs">
					{profile.links.homepage[0].slice(8, -1)}
				</a>
			</div>
		</>
	);
};

export default CoinPageSummary;
