import React from 'react';
import CryptoDropdown from './CryptoDropdown';
import CoinGraphTitle from './CoinGraphTitle';
import DateButtons from './DateButtons';
import OverviewGraph from './OverviewGraph';

const CoinGraphs = () => {
	return (
		<div className="flex flex-col my-4">
			<CryptoDropdown />
			<div className="flex flex-col lg:flex-row justify-between items-center">
				<div className="flex flex-col items-center relative rounded-lg dark:bg-darkNonIntComponentBg bg-lightModeWhite lg:w-[48%] w-11/12 mb-4 h-80">
					<div className="flex justify-between items-start w-full p-4">
						<CoinGraphTitle />
						<div className="flex justify-between items-center w-80 h-7 rounded-lg dark:bg-darkIntComponentBg px-4">
							<DateButtons />
						</div>
					</div>
					<OverviewGraph type="line" />
				</div>
				<div className="hidden sm:flex flex-col items-center relative rounded-lg dark:bg-darkNonIntComponentBg bg-lightModeWhite lg:w-[48%] w-11/12 h-80">
					<div className="flex justify-between items-start w-full p-4">
						<CoinGraphTitle volume={true} />
					</div>
					<OverviewGraph type="bar" />
				</div>
			</div>
		</div>
	);
};

export default CoinGraphs;
