import React from 'react';

interface SearchIconProps {
	fill: string;
	className?: string;
}

const SearchIcon: React.FC<SearchIconProps> = ({ fill, className }) => (
	<svg
		className={className}
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 20 20"
		fill={fill}
	>
		<g id="Search" transform="translate(0)">
			<path
				id="Search-2"
				data-name="Search"
				d="M19.756,18.607l-3.437-3.361h0l-.081-.123a.809.809,0,0,0-1.137,0h0a8.113,8.113,0,0,1-10.519.34A7.679,7.679,0,0,1,2.876,5.31,8.075,8.075,0,0,1,12.953,2.342a7.741,7.741,0,0,1,4.314,9.385.779.779,0,0,0,.182.772.822.822,0,0,0,.774.232.8.8,0,0,0,.593-.54h0a9.334,9.334,0,0,0-5-11.25A9.754,9.754,0,0,0,1.689,4.085,9.256,9.256,0,0,0,3.049,16.28a9.789,9.789,0,0,0,12.535.515l3.044,2.976a.819.819,0,0,0,1.137,0,.784.784,0,0,0,0-1.12h0Z"
			/>
		</g>
	</svg>
);

export default SearchIcon;
