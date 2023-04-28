import Footer from './components/Footer';
import Header from './components/Header';
import { useAppSelector } from './redux/app/hooks';

function App() {
	const { darkMode } = useAppSelector((state) => state.theme);

	return (
		<div className={`${darkMode && 'dark'} min-h-screen flex flex-col`}>
			<Header />
			<main className="dark:bg-darkBg bg-lightModeBgGray flex-grow text-white"></main>
			<Footer />
		</div>
	);
}

export default App;
