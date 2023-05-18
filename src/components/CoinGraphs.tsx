import React from 'react';
import CryptoDropdown from './CryptoDropdown';
import CoinGraphTitle from './CoinGraphTitle';

const CoinGraphs = () => {
	return (
		<div className="flex flex-col">
			<CryptoDropdown />
			<div className="flex justify-between">
				<div className="flex flex-col items-center relative rounded-lg dark:bg-darkNonIntComponentBg bg-lightModeWhite w-[48%] h-80">
					<div className="flex justify-between items-start w-full p-4">
						<CoinGraphTitle />
					</div>
				</div>
				<div className="flex flex-col items-center relative rounded-lg dark:bg-darkNonIntComponentBg bg-lightModeWhite w-[48%] h-80"></div>
			</div>
		</div>
	);
};

export default CoinGraphs;
