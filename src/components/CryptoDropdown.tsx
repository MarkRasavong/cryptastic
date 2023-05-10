import React from 'react';
import { FaAngleDown } from 'react-icons/fa';

const CryptoDropdown = () => {
	const [selectedCrypto, setSelectedCrypto] = React.useState('Bitcoin');

	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedCrypto(e.target.value);
	};

	return (
		<div className="relative inline-block border-none">
			<div className="bg-inherit rounded-md py-2 pl-3 pr-10 text-sm font-medium border-none flex items-center">
				{selectedCrypto} Overview{' '}
				<span className="ml-1">
					<FaAngleDown />
				</span>
			</div>
			<select
				className="appearance-none bg-transparent opacity-0 absolute top-0 left-0 h-full w-full cursor-pointer dark:bg-darkBg bg-lightModeWhite pr-8"
				id="crypto-select"
				value={selectedCrypto}
				onChange={handleSelect}
				aria-label="Crypto Select"
			>
				<option value="Bitcoin">Bitcoin</option>
				<option value="Ethereum">Ethereum</option>
			</select>
		</div>
	);
};

export default CryptoDropdown;
