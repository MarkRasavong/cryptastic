import React, { useEffect, useState } from 'react';
import { FaLink, FaTrash } from 'react-icons/fa';
import { TickerSymbolDown, TickerSymbolUp } from '../components/icons/TickerSymbol';
import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
import { fetchPortfolioData } from '../features/portfolio';
import { moneySuffix, roundToNumber, setCurrency } from '../utils';

const PortfolioPage = () => {
	const dispatch = useAppDispatch();
	const { darkMode } = useAppSelector((state) => state.theme);
	const { coins: profiles, loading } = useAppSelector((state) => state.portfolio);
	const currency = useAppSelector((state) => state.currency.value);
	const [deleteModal, setDeleteModal] = useState(false);
	const [modal, setModal] = useState(false);

	const ProgressBar = ({ className, widthPercentage }: ProgressBarProps) => (
		<div className={`flex flex-col w-14 justify-center items-center ${className}`}>
			<div
				className={`relative bg-cryptoGreen h-3 w-full rounded-full overflow-hidden border-black`}
			>
				<div
					className={`absolute top-0 left-0 h-full ${
						darkMode ? 'bg-cryptoSliderWhite' : 'bg-black'
					} rounded-full`}
					style={{ width: `${widthPercentage}%` }}
				/>
			</div>
		</div>
	);

	const keyNumber = Math.trunc(Math.random() * (100 - 1) + 1);

	useEffect(() => {
		dispatch(fetchPortfolioData());
	}, []);

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
					profiles.map((profile, idx) => {
						const [displayTrashIcon, setDisplayTrashIcon] = useState(false);
						const marketCapToTotalVol = roundToNumber(
							(profile.totalVolume * 100) / profile.marketCap,
							0
						);

						return (
							<div
								key={profile.id + keyNumber}
								className={`${idx !== 0 && 'mt-6'} flex md:justify-between flex-col lg:flex-row`}
							>
								<div
									className="bg-lightModeWhite dark:bg-darkNonIntComponentBg ml-5 flex flex-col justify-center items-center rounded-lg sm:items-center cursor-pointer lg:px-8 lg:pb-5 py-10"
									onMouseOver={() => setDisplayTrashIcon(true)}
									onMouseOut={() => setDisplayTrashIcon(false)}
								>
									<div className="mt-6 flex flex-col justify-center items-center">
										<div className="bg-lightModeBgGray dark:bg-darkIntComponentBg rounded-lg justify-center flex p-4">
											<img src={profile.image} alt={`${profile.name} logo`} />
										</div>
										<div className="text-xs mt-2 text-center">
											<span id="profile_name_cryptoTitle">
												{profile.name}
												{profile.name.length > 7 && <br />}
											</span>
											<span id="profile_symbol_cryptoTitle">
												{profile.symbol && ` (${profile.symbol.toUpperCase()})`}
											</span>
										</div>
										<div className="text-xs lg:text-[0.5rem] text-center mt-2 h-8 flex justify-center items-center hover:w-16 hover:dark:bg-darkIntComponentBg rounded-lg hover:bg-lightModeBgGray">
											<div id="asset-last-updated" className="w-16 flex justify-center">
												{displayTrashIcon ? (
													<FaTrash size={'0.5rem'} />
												) : (
													`Updated: ${profile.purchase_date}`
												)}
											</div>
										</div>
									</div>
								</div>
								<div className="flex flex-col text-sm lg:text-[0.6rem] ml-5 mt-3 lg:mt-0">
									<h6 className="mb-2">Market Price:</h6>
									<div className="flex flex-col lg:flex-row justify-around bg-lightModeWhite dark:bg-darkNonIntComponentBg rounded-lg">
										<div className="flex p-3 items-center">
											<p>Current price: </p>{' '}
											<p className="text-cryptoGreen ml-2">
												{setCurrency(currency)}
												{moneySuffix(roundToNumber(profile.currentPrice, 2))}
											</p>
										</div>
										<div className="flex p-3 items-center">
											<p>Price change 24h: </p>{' '}
											<p className="flex items-center ml-2">
												{profile.priceChange24h > 0 ? <TickerSymbolUp /> : <TickerSymbolDown />}
												<span
													className={`${
														profile.priceChange24h > 0 ? 'text-cryptoGreen' : 'text-cryptoRed'
													}`}
												>
													{roundToNumber(profile.priceChange24h, 2)}
												</span>
											</p>
										</div>
										<div className="flex p-3 items-center">
											<p className="mr-2">Market Cap vs Volume: </p>
											<p className="mr-1 text-cryptoGreen">
												{isNaN(marketCapToTotalVol) ? (
													<span className="text-lg">∞</span>
												) : (
													`${marketCapToTotalVol}%`
												)}
											</p>
											<span>
												<ProgressBar widthPercentage={marketCapToTotalVol} />
											</span>
										</div>
										<div className="flex p-3 items-center">
											<p>Circ Supply vs Max Supply: </p>{' '}
											<span className="text-cryptoGreen ml-2">
												{profile.maxSupply !== null && profile.circulatingSupply !== null ? (
													`${((profile.circulatingSupply * 100) / profile.maxSupply).toFixed(0)}%`
												) : (
													<span className="text-lg">∞</span>
												)}
											</span>
										</div>
									</div>
									<h6 className="my-2">Your Coin:</h6>
									<div className="flex flex-col lg:flex-row justify-around bg-lightModeWhite dark:bg-darkNonIntComponentBg rounded-lg">
										<div className="flex p-3 items-center">
											<p className="mr-1">Coin Amount: </p>{' '}
											<span className="text-cryptoGreen">{profile.coinAmount}</span>
										</div>
										<div className="flex p-3 items-center">
											<p className="mr-1">Amount Value: </p>{' '}
											<span className="text-cryptoGreen">
												{setCurrency(currency)}
												{moneySuffix(profile.total)}
											</span>
										</div>
										<div className="flex p-3">
											<p>Change Since Purchase: </p>{' '}
											<p
												className={`${
													profile.priceChange > 0 ? 'text-cryptoGreen ' : 'text-cryptoRed'
												} flex items-center`}
											>
												{profile.priceChange > 0 ? <TickerSymbolUp /> : <TickerSymbolDown />}
												{setCurrency(currency)}
												{moneySuffix(roundToNumber(profile.priceChange, 2))}
											</p>
										</div>
										<div className="flex p-3 items-center">
											<p className="mr-1">Purchase Date: </p>{' '}
											<span className="text-cryptoGreen">{profile.purchase_date}</span>
										</div>
									</div>
								</div>
							</div>
						);
					})
				)}
			</section>
		</main>
	);
};

export default PortfolioPage;

interface ProgressBarProps {
	widthPercentage: number;
	className?: string;
}
