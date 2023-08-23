import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import { useAppSelector } from './redux/app/hooks';
import OverviewPage from './pages/OverviewPage';
import PortolioPage from './pages/PortolioPage';
import CoinNavSummary from './components/CoinNavSummary';
import CoinPage from './pages/CoinPage';
import Error404 from './pages/Error404';

function App() {
	const { darkMode } = useAppSelector((state) => state.theme);

	return (
		<BrowserRouter>
			<div className={`${darkMode && 'dark'} min-h-screen flex flex-col`}>
				<Header />
				<CoinNavSummary />
				<main className="dark:bg-darkBg bg-lightModeBgGray flex-grow dark:text-white">
					<Routes>
						<Route path="/" element={<OverviewPage />} />
						<Route path="/portfolio" element={<PortolioPage />} />
						<Route path={`/coin/:id`} element={<CoinPage />} />
						<Route path="*" element={<Error404 />} />
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	);
}

export default App;
