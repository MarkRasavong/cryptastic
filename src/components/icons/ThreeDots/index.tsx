import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

interface ThreeDotLoaderProps {
	color: string;
	height?: number;
	width?: number;
	radius?: number;
}

const ThreeDotsLoader: React.FC<ThreeDotLoaderProps> = ({ color, height, width, radius }) => {
	return (
		<ThreeDots
			height={height}
			width={width}
			radius={radius}
			color={color}
			ariaLabel="three-dots-loading"
			visible={true}
		/>
	);
};

ThreeDotsLoader.defaultProps = {
	color: '#4fa94d',
	height: 80,
	width: 80,
	radius: 9,
};

export default ThreeDotsLoader;
