import React, { useState } from 'react';
import portfolio, { Profile } from '../features/portfolio';

export type ModalTypes = 'edit' | 'delete' | 'add' | 'hidden';

interface CustomModalProps {
	modalType: ModalTypes;
	onClose: () => void;
	onConfirm: () => void;
	profile: Profile | null;
}

const PortfolioCardModal = ({ modalType, onClose, onConfirm, profile }: CustomModalProps) => {
	const [search, setSearch] = useState(profile ? profile.name : '');
	const [amountPurchased, setAmountPurchased] = useState(
		profile ? profile.coinAmount.toString() : ''
	);
	const [purchaseDate, setPurchaseDate] = useState(profile ? profile.purchase_date : '');

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};

	const handleAmountPurchasedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAmountPurchased(event.target.value);
	};

	const handlePurchaseDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPurchaseDate(event.target.value);
		console.log(event.target.value);
	};

	if (modalType === 'hidden') {
		return null;
	}

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
			<div className="modal-container dark:bg-darkIntComponentBg bg-lightModeBgGray w-96 rounded-lg shadow-lg z-10">
				<div className="modal-header p-4 rounded-t-lg flex justify-between">
					<h2 className="text-lg font-semibold">
						{modalType === 'edit' ? 'Edit' : 'Delete'} Asset
					</h2>
					<button className="modal-close text-cryptoGreen" onClick={onClose}>
						&times;
					</button>
				</div>
				{modalType === 'edit' ? (
					<div className="modal-body p-4 flex flex-col">
						{profile && (
							<div className="flex flex-col items-center justify-center rounded-lg p-4 mb-2 bg-darkNonIntComponentBg">
								<img src={profile?.image} alt={`${profile?.name} logo`} />
								<p>{profile?.name}</p>
								<p>{profile ? profile?.symbol : ''}</p>
							</div>
						)}
						<div>
							<input
								type="text"
								placeholder="Search"
								value={search}
								onChange={handleSearchChange}
								className="block w-full p-2 border rounded text-lightModeText bg-lightModeWhite dark:bg-lightModeBgGray dark:border-darkNonIntComponentBg"
							/>
							<input
								type="number"
								placeholder="Amount Purchased"
								value={amountPurchased}
								onChange={handleAmountPurchasedChange}
								className="block w-full mt-2 p-2 border rounded text-lightModeText bg-lightModeWhite dark:bg-lightModeBgGray dark:border-darkNonIntComponentBg"
							/>
							<input
								type="date"
								value={purchaseDate}
								onChange={handlePurchaseDateChange}
								className="block w-full mt-2 p-2 border rounded text-lightModeText bg-lightModeWhite dark:bg-lightModeBgGray dark:border-darkNonIntComponentBg"
							/>
						</div>
					</div>
				) : (
					<div className="p-5 dark:text-darkModeText text-lightModeText">
						<p className="block text-xs mb-8">
							Are you sure you want to permanently remove this portfolio asset?
						</p>
						<div className="flex justify-between rounded-lg dark:bg-darkNonIntComponentBg bg-lightModeWhite p-3">
							<img src={profile?.image} alt={`${profile?.name} logo`} />
							<p>{profile?.name}</p>
							<p>{profile?.symbol.toUpperCase()}</p>
						</div>
					</div>
				)}
				<div className="modal-footer p-5 rounded-b-lg flex justify-center">
					<button
						className="modal-button cancel bg-lightModeWhite px-4 py-2 mr-2 rounded dark:text-cryptoGreen w-1/2"
						onClick={onClose}
					>
						Cancel
					</button>
					<button
						className={`modal-button confirm w-1/2 ${
							modalType === 'delete' ? 'bg-cryptoRed' : 'bg-cryptoGreen'
						} px-4 py-2 rounded text-white`}
						onClick={onConfirm}
					>
						{modalType === 'delete' ? 'Yes, delete asset' : 'Confirm'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default PortfolioCardModal;
