import React from 'react';
import { CoinPageData } from '../pages/CoinPage';
import { FaLink } from 'react-icons/fa';

interface CoinPageSummaryProps {
	profile: CoinPageData;
}

const CoinPageSummary = ({ profile }: CoinPageSummaryProps) => {
	return (
		<div>
			<div className="bg-lightModeWhite dark:bg-darkNonIntComponentBg dark:text-white rounded-lg px-6 py-12 flex flex-col items-center">
				<div className="bg-lightModeBgGray dark:bg-darkIntComponentBg rounded-lg text-center flex p-4">
					<img src={profile.image.thumb} alt={`${profile.name} logo`} />
				</div>
				<div className="text-sm mt-1">
					<span id="profile_name_cryptoTitle" className="whitespace-nowrap">
						{profile.name}
						{profile.name.length > 7 && (
							<>
								<br />
							</>
						)}
					</span>
					<span id="profile_symbol_cryptoTitle" className="whitespace-nowrap">
						{profile.symbol.length !== 0 && ` (${profile.symbol.toUpperCase()})`}
					</span>
				</div>
			</div>
			<div className="bg-lightModeWhite dark:bg-darkNonIntComponentBg dark:text-white rounded-lg mt-2 p-4 flex">
				<a href={profile.links.homepage[0]} target="_blank" rel="noreferrer" className="mr-4">
					<FaLink />
				</a>
				<a href={profile.links.homepage[0]} target="_blank" rel="noreferrer" className="text-xs">
					{profile.links.homepage[0].slice(8, -1)}
				</a>
			</div>
		</div>
	);
};

export default CoinPageSummary;
