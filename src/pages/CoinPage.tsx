import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../redux/app/hooks';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CoinPageSummary from '../components/CoinPageSummary';
import CoinPageMarketSummary from '../components/CoinPageMarketSummary';
import CoinPageDataSummary from '../components/CoinPageDataSummary';
import { FaCoins } from 'react-icons/fa';
import CoinPageLinks from '../components/CoinPageLinks';
import CryptoToCurrencyConvert from '../components/CryptoToCurrencyConvert';

const CoinPage: React.FC = () => {
	const { id } = useParams();
	const [profile, setProfile] = useState<CoinPageData>();
	const [isLoading, setIsLoading] = useState(false);

	const getCoinInfo = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios(
				`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=true`
			);
			setProfile(data);
			setIsLoading(false);
		} catch (err) {
			console.log('Location Error:', err);
		}
	};

	useEffect(() => {
		getCoinInfo();
	}, [id]);

	const hasCoinProfile = !isLoading && profile;

	return (
		<div className="max-w-screen-md mx-auto">
			{hasCoinProfile && (
				<div className="flex flex-col my-4">
					<section id="coin-summary">
						<div className="mb-6">
							<h1>{profile.name} Summary</h1>
						</div>
						<div className="hidden sm:flex sm:justify-between">
							<CoinPageSummary profile={profile} />
							<CoinPageMarketSummary profile={profile} />
							<CoinPageDataSummary profile={profile} />
						</div>
						<div className="flex flex-col justify-between items-center sm:hidden">
							<CoinPageSummary profile={profile} />
							<CoinPageMarketSummary profile={profile} />
							<CoinPageDataSummary profile={profile} />
						</div>
					</section>
					{profile.description.en.length > 0 && (
						<section id="coin-description" className="flex flex-col items-center">
							<div className="my-6 self-start">
								<h1>Description</h1>
							</div>
							<div className="flex flex-col bg-lightModeWhite dark:bg-darkNonIntComponentBg rounded-lg w-4/5 sm:w-fit">
								<div className="w-full justify-center flex p-6">
									<FaCoins />
								</div>
								<div
									className="px-8 pb-6 text-center"
									dangerouslySetInnerHTML={{
										__html: profile.description.en,
									}}
								/>
							</div>
						</section>
					)}
					<section
						id="coin-links"
						className="flex mobile:flex-col mobile:items-center justify-between my-6"
					>
						<CoinPageLinks profile={profile} />
					</section>
					<section
						id="coin-to-currency-convert"
						className="flex mobile:flex-col sm:justify-center sm:items-center mobile:items-center"
					>
						<CryptoToCurrencyConvert profile={profile} />
					</section>
				</div>
			)}
		</div>
	);
};

export default CoinPage;

export interface CoinPageData {
	id: string;
	symbol: string;
	name: string;
	asset_platform_id: null | string;
	platforms: {
		[key: string]: string;
	};
	detail_platforms: {
		[key: string]: {
			decimal_place: null | number;
			contract_address: string;
		};
	};
	block_time_in_minutes: number;
	hashing_algorithm: string;
	categories: string[];
	public_notice: null;
	additional_notices: any[];
	description: {
		en: string;
	};
	links: {
		homepage: string[];
		blockchain_site: string[];
		official_forum_url: string[];
		chat_url: string[];
		announcement_url: string[];
		twitter_screen_name: string;
		facebook_username: string;
		bitcointalk_thread_identifier: number;
		telegram_channel_identifier: string;
		subreddit_url: string;
		repos_url: {
			github: string[];
			bitbucket: string[];
		};
	};
	image: {
		thumb: string;
		small: string;
		large: string;
	};
	market_data: {
		current_price: {
			eur: number;
			gbp: number;
			usd: number;
		};
		total_value_locked: null;
		mcap_to_tvl_ratio: null;
		fdv_to_tvl_ratio: null;
		roi: null;
		ath: {
			eur: number;
			gbp: number;
			usd: number;
		};
		ath_change_percentage: {
			eur: number;
			gbp: number;
			usd: number;
		};
		ath_date: {
			eur: number;
			gbp: number;
			usd: number;
		};
		atl: {
			eur: number;
			gbp: number;
			usd: number;
		};
		atl_change_percentage: {
			eur: number;
			gbp: number;
			usd: number;
		};
		atl_date: {
			eur: number;
			gbp: number;
			usd: number;
		};
		market_cap: {
			eur: number;
			gbp: number;
			usd: number;
		};
		market_cap_rank: number;
		fully_diluted_valuation: {
			eur: number;
			gbp: number;
			usd: number;
		};
		total_volume: {
			eur: number;
			gbp: number;
			usd: number;
		};
		high_24h: {
			eur: number;
			gbp: number;
			usd: number;
		};
		low_24h: {
			eur: number;
			gbp: number;
			usd: number;
		};
		price_change_24h: number;
		price_change_percentage_24h: number;
		price_change_percentage_7d: number;
		price_change_percentage_14d: number;
		price_change_percentage_30d: number;
		price_change_percentage_60d: number;
		price_change_percentage_200d: number;
		price_change_percentage_1y: number;
		market_cap_change_24h: number;
		market_cap_change_percentage_24h: number;
		price_change_24h_in_currency: {
			eur: number;
			gbp: number;
			usd: number;
		};
		price_change_percentage_1h_in_currency: {
			eur: number;
			gbp: number;
			usd: number;
		};
		price_change_percentage_24h_in_currency: {
			eur: number;
			gbp: number;
			usd: number;
		};
		price_change_percentage_7d_in_currency: {
			eur: number;
			gbp: number;
			usd: number;
		};
		price_change_percentage_14d_in_currency: {
			eur: number;
			gbp: number;
			usd: number;
		};
		price_change_percentage_30d_in_currency: {
			eur: number;
			gbp: number;
			usd: number;
		};
		price_change_percentage_60d_in_currency: {
			eur: number;
			gbp: number;
			usd: number;
		};
		price_change_percentage_200d_in_currency: {
			eur: number;
			gbp: number;
			usd: number;
		};
		price_change_percentage_1y_in_currency: {
			eur: number;
			gbp: number;
			usd: number;
		};
		market_cap_change_24h_in_currency: {
			eur: number;
			gbp: number;
			usd: number;
		};
		market_cap_change_percentage_24h_in_currency: {
			eur: number;
			gbp: number;
			usd: number;
		};
		total_supply: number;
		max_supply: null;
		circulating_supply: number;
		sparkline_7d: {
			price: number[];
		};
		last_updated: string;
	};
	last_updated: string;
}
