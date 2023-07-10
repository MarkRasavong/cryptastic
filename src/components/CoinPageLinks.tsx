import React from 'react';
import { CoinPageData } from '../pages/CoinPage';
import { FaLink, FaRegCopy } from 'react-icons/fa';

interface CoinPageSummaryProps {
	profile: CoinPageData;
}

const CoinPageLinks = ({ profile }: CoinPageSummaryProps) => {
	const availableLinks = profile.links.blockchain_site.filter((site) => site);
	const arrayLength = availableLinks.length > 3 ? 3 : availableLinks.length;

	return (
		<>
			{availableLinks.slice(0, arrayLength).map((site) => (
				<div className="flex justify-between bg-lightModeWhite dark:bg-darkNonIntComponentBg rounded-lg items-center w-4/5 max-[640px]:mb-4">
					<button className=" cursor-pointer p-4">
						<FaLink />
					</button>
					<a
						key={site}
						href={site}
						target="_blank"
						rel="noreferrer"
						className="text-xs px-2 max-w-[150px] cursor-pointer py-2 whitespace-nowrap overflow-ellipsis overflow-hidden"
					>
						{site}
					</a>
					<button className="text-xs cursor-pointer p-4">
						<FaRegCopy size={'1rem'} />
					</button>
				</div>
			))}
		</>
	);
};

export default CoinPageLinks;
