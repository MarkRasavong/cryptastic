import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
import { fetchPortfolioData } from '../features/portfolio';
import PortfolioCard from '../components/PortfolioCard';
import { Profile } from '../features/portfolio';
import PortfolioCardModal, { ModalTypes } from '../components/PortfolioCardModal';

const PortfolioPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const { coins: profiles, loading } = useAppSelector((state) => state.portfolio);
	const [modal, setModal] = useState<ModalTypes>('hidden');
	const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

	useEffect(() => {
		dispatch(fetchPortfolioData());
	}, []);

	const handleCardDelete = (
		profile: Profile,
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.stopPropagation();
		setSelectedProfile(profile); // Store the selected profile
		setModal('delete');
	};

	const handleCardEdit = (profile: Profile) => {
		setSelectedProfile(profile); // Store the selected profile
		setModal('edit');
	};

	const handleCloseModal = () => {
		setModal('hidden');
		setSelectedProfile(null); // Reset selected profile
	};

	const handleConfirmDelete = () => {
		// Handle delete action here
		console.log('Delete confirmed');
		handleCloseModal();
	};

	const handleConfirmEdit = () => {
		// Handle edit action here
		console.log('Edit confirmed');
		handleCloseModal();
	};

	return (
		<main className="max-w-screen-md mx-auto">
			{/* ... */}
			<section id="portfolio-my-assets" className="w-11/12">
				<h1 className="mb-8 ml-5">My Assets</h1>
				{loading ? (
					<div>Loading...</div>
				) : (
					profiles.map((profile, idx) => (
						<PortfolioCard
							key={profile.id}
							idx={idx}
							profile={profile}
							onDelete={(e) => handleCardDelete(profile, e)}
							onEdit={() => handleCardEdit(profile)}
						/>
					))
				)}
			</section>

			<PortfolioCardModal
				modalType={modal}
				onClose={handleCloseModal}
				onConfirm={handleConfirmEdit}
				profile={selectedProfile}
			/>
		</main>
	);
};

export default PortfolioPage;
