import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
import { fetchPortfolioData } from '../features/portfolio';
import PortfolioCard from '../components/PortfolioCard';

const PortfolioPage = () => {
	const dispatch = useAppDispatch();
	const { coins: profiles, loading } = useAppSelector((state) => state.portfolio);
	const [modal, setModal] = useState(false);

	useEffect(() => {
		dispatch(fetchPortfolioData());
	}, []);

	const handleCardDelete = () => {
		setModal(true);
	};

	const handleCardEdit = () => {
		setModal(true);
		console.log('clicked');
	};

	return (
		<main className="max-w-screen-md mx-auto">
			<div className="flex justify-center w-full my-10">
				<button className="bg-cryptoGreen px-20 py-3 rounded-lg">Add Asset</button>
			</div>
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
							onDelete={handleCardDelete}
							onEdit={handleCardEdit}
						/>
					))
				)}
			</section>
		</main>
	);
};

export default PortfolioPage;
