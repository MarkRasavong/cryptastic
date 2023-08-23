import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen px-4">
			<h1 className="text-3xl md:text-4xl font-bold mb-4">404 - Page Not Found</h1>
			<p className="text-lg md:text-xl text-center mb-8">
				The page you're looking for does not exist.
			</p>
			<Link to="/" className="text-cryptoGreen hover:underline text-sm md:text-base">
				Go back to home
			</Link>
		</div>
	);
};

export default Error404;
