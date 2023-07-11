import React from 'react';
import { FaXing } from 'react-icons/fa';
import { CoinPageData } from '../pages/CoinPage';
import { useAppSelector } from '../redux/app/hooks';

interface CryptoToCurrencyConvertProps {
	profile: CoinPageData;
}

const CryptoToCurrencyConvert = ({ profile }: CryptoToCurrencyConvertProps) => {
	const currency = useAppSelector((state) => state.currency.value);

	return (
		<>
			<div className="relative mobile:w-4/5">
				<div className="bg-cryptoGreen rounded-md absolute inset-y-0 left-0 p-2 pointer-events-none flex items-center justify-center">
					{profile.symbol.toUpperCase()}
				</div>
				<input
					className="pl-14 px-4 py-2 mobile:w-full border-darkNonIntComponentBg rounded-md bg-lightModeWhite dark:bg-darkNonIntComponentBg"
					type="number"
				/>
			</div>

			<FaXing className="mx-8 mobile:my-3" size={'1.5rem'} />

			<div className="relative mobile:w-4/5">
				<div className="bg-cryptoGreen rounded-md absolute inset-y-0 left-0 p-2 pointer-events-none flex items-center justify-center">
					{currency.toUpperCase()}
				</div>
				<input
					className="pl-14 px-4 py-2 mobile:w-full border-darkNonIntComponentBg rounded-md bg-lightModeWhite dark:bg-darkNonIntComponentBg"
					type="number"
				/>
			</div>
		</>
	);
};

export default CryptoToCurrencyConvert;
