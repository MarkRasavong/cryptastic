import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import { useAppSelector } from './redux/app/hooks';
import OverviewPage from './pages/OverviewPage';
import PortolioPage from './pages/PortolioPage';

function App() {
	const { darkMode } = useAppSelector((state) => state.theme);

	return (
		<BrowserRouter>
			<div className={`${darkMode && 'dark'} min-h-screen flex flex-col`}>
				<Header />
				<main className="dark:bg-darkBg bg-lightModeBgGray flex-grow dark:text-white">
					<Routes>
						<Route path="/" element={<OverviewPage />} />
						<Route path="/portfolio" element={<PortolioPage />} />
						{/* Misc. routes goes here 
              <Route path='*' element={<Error404 />} />
							*/}
					</Routes>
				</main>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
