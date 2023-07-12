import React, { useEffect, useState } from 'react';
import { CoinPageData } from '../pages/CoinPage';
import { FaLink, FaRegCopy } from 'react-icons/fa';

interface CoinPageSummaryProps {
	profile: CoinPageData;
}

interface LinkData {
	site: string;
	tooltipVisible: boolean;
	tooltipText: 'Click to Copy' | 'Copied';
}

const CoinPageLinks = ({ profile }: CoinPageSummaryProps) => {
	const availableLinks = profile.links.blockchain_site.filter((site) => site);
	const arrayLength = availableLinks.length > 3 ? 3 : availableLinks.length;

	const [links, setLinks] = useState<LinkData[]>(() =>
		availableLinks.slice(0, arrayLength).map((site) => ({
			site,
			tooltipVisible: false,
			tooltipText: 'Click to Copy',
		}))
	);

	const handleCopyClick = (index: number) => {
		navigator.clipboard.writeText(links[index].site);
		const updatedLinks = [...links];
		updatedLinks[index].tooltipText = 'Copied';
		updatedLinks[index].tooltipVisible = true;
		setLinks(updatedLinks);
		setTimeout(() => {
			updatedLinks[index].tooltipText = 'Click to Copy';
			updatedLinks[index].tooltipVisible = false;
			setLinks(updatedLinks);
		}, 1000);
	};

	return (
		<>
			{links.map((link, index) => (
				<div
					key={link.site}
					className="flex justify-between bg-lightModeWhite dark:bg-darkNonIntComponentBg rounded-lg items-center w-4/5 mobile:mb-4 sm:mx-3"
				>
					<a href={link.site} target="_blank" rel="noreferrer">
						<button className="cursor-pointer p-3">
							<FaLink />
						</button>
					</a>
					<a
						href={link.site}
						target="_blank"
						rel="noreferrer"
						className="text-xs max-w-[150px] cursor-pointer py-2 whitespace-nowrap overflow-ellipsis overflow-hidden"
					>
						{link.site}
					</a>
					<div className="relative">
						<button
							className="text-xs cursor-pointer p-2"
							onClick={() => handleCopyClick(index)}
							onMouseEnter={() => {
								const updatedLinks = [...links];
								updatedLinks[index].tooltipVisible = true;
								setLinks(updatedLinks);
							}}
							onMouseLeave={() => {
								const updatedLinks = [...links];
								updatedLinks[index].tooltipVisible = false;
								setLinks(updatedLinks);
							}}
						>
							<FaRegCopy size={'1rem'} />
						</button>
						{link.tooltipVisible && (
							<span className="text-[0.5rem] bg-gray-700 text-white text-center rounded-md p-2 absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-100 transition-opacity duration-300">
								{link.tooltipText}
							</span>
						)}
					</div>
				</div>
			))}
		</>
	);
};

export default CoinPageLinks;
