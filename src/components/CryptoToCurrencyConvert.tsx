import React, { useState } from 'react';
import { FaXing } from 'react-icons/fa';
import { CoinPageData } from '../pages/CoinPage';
import { useAppSelector } from '../redux/app/hooks';
import { moneySuffix, roundToNumber } from '../utils';

interface CryptoToCurrencyConvertProps {
	profile: CoinPageData;
}

const CryptoToCurrencyConvert = ({ profile }: CryptoToCurrencyConvertProps) => {
	const currency = useAppSelector((state) => state.currency.value);
	const currentCoinPriceInFiat = profile.market_data.current_price[currency];
	const [inputValue, setInputValue] = useState(1);
	const [fiatValue, setFiatValue] = useState(currentCoinPriceInFiat);

	const currentPrice = roundToNumber(currentCoinPriceInFiat, 2);

	const handleCryptoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const crypto = Number(e.target.value);
		const hasNum = crypto ? crypto : '';
		const fiat = (hasNum as number) * currentPrice;
		const fiatTotal = fiat > 1000 ? moneySuffix(fiat) : fiat.toFixed(2);
		setInputValue(hasNum as number);
		setFiatValue(fiatTotal as number);
	};

	const handleFiatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = Number(e.target.value);
		const fiat = input ? input : '';
		const cryptoTotal = input ? roundToNumber((fiat as number) / currentPrice, 2) : '';
		setInputValue(cryptoTotal as number);
		setFiatValue(fiat as number);
	};

	return (
		<>
			<div className="relative mobile:w-4/5">
				<div className="bg-cryptoGreen rounded-md absolute inset-y-0 left-0 p-2 pointer-events-none flex items-center justify-center">
					{profile.symbol.toUpperCase()}
				</div>
				<input
					className="overflow-y-hidden pl-16 px-4 py-2 mobile:w-full border-darkNonIntComponentBg rounded-md bg-lightModeWhite dark:bg-darkNonIntComponentBg"
					type="number"
					onChange={handleCryptoChange}
					value={inputValue}
				/>
			</div>

			<FaXing className="mx-8 mobile:my-3" size={'1.5rem'} />

			<div className="relative mobile:w-4/5">
				<div className="bg-cryptoGreen rounded-md absolute inset-y-0 left-0 p-2 pointer-events-none flex items-center justify-center">
					{currency.toUpperCase()}
				</div>
				<input
					className="overflow-y-hidden pl-16 px-4 py-2 mobile:w-full border-darkNonIntComponentBg rounded-md bg-lightModeWhite dark:bg-darkNonIntComponentBg"
					type="number"
					onChange={handleFiatChange}
					value={fiatValue}
				/>
			</div>
		</>
	);
};

export default CryptoToCurrencyConvert;
