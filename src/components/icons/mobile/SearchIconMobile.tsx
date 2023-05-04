import React from 'react';

interface SearchIconMobileProps {
	darkMode?: boolean;
	selected?: boolean;
	className?: string;
}

export const SearchIconMobile: React.FC<SearchIconMobileProps> = ({
	selected,
	darkMode,
	className,
}) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="40"
			height="49.013"
			viewBox="0 0 40 49.013"
			className={className}
		>
			<g id="Group_3801" data-name="Group 3801" transform="translate(-407.702 -926)">
				<g id="Group_3658" data-name="Group 3658" transform="translate(820.702 139.013)">
					<text
						id="Search"
						transform="translate(-413 832)"
						fill={darkMode ? '#fff' : selected ? '#00ff5f' : '#000'}
						fontSize="11"
						fontFamily="Poppins, sans-serif"
						fontWeight="600"
					>
						<tspan x="0" y="0">
							Search
						</tspan>
					</text>
				</g>
				{!selected ? (
					<g
						id="Iconly_Broken_Search"
						data-name="Iconly/Broken/Search"
						transform="translate(414 926)"
					>
						<g id="Search-2" data-name="Search" transform="translate(0 0)">
							<path
								id="Search-3"
								data-name="Search"
								d="M26.082,24.565l-4.538-4.437h0l-.106-.162a1.069,1.069,0,0,0-1.5,0h0a10.711,10.711,0,0,1-13.887.449A10.138,10.138,0,0,1,3.8,7.011,10.662,10.662,0,0,1,17.1,3.092a10.221,10.221,0,0,1,5.7,12.391,1.028,1.028,0,0,0,.24,1.019,1.085,1.085,0,0,0,1.022.306,1.06,1.06,0,0,0,.782-.712h0a12.323,12.323,0,0,0-6.6-14.853A12.878,12.878,0,0,0,2.23,5.394a12.22,12.22,0,0,0,1.8,16.1,12.924,12.924,0,0,0,16.549.68L24.593,26.1a1.081,1.081,0,0,0,1.5,0,1.035,1.035,0,0,0,0-1.479h0Z"
								transform="translate(0)"
								fill={darkMode ? '#fff' : '#000'}
							/>
						</g>
					</g>
				) : (
					<g
						id="Iconly_Bulk_Search"
						data-name="Iconly/Bulk/Search"
						transform="translate(409.241 921.24)"
					>
						<path
							id="Path_3460"
							data-name="Path 3460"
							d="M9.5,0A9.5,9.5,0,1,1,0,9.5,9.5,9.5,0,0,1,9.5,0Z"
							transform="translate(4.556 5)"
							fill="#00ff5f"
							opacity="0.4"
						/>
						<g id="Search-2" data-name="Search" transform="translate(2.759 2.759)">
							<path
								id="Subtraction_2"
								data-name="Subtraction 2"
								d="M-2177.34,52.117a11.749,11.749,0,0,1-8.389-3.5,11.9,11.9,0,0,1-3.475-8.442,11.9,11.9,0,0,1,3.475-8.441,11.749,11.749,0,0,1,8.389-3.5,11.749,11.749,0,0,1,8.389,3.5,11.9,11.9,0,0,1,3.475,8.441,11.9,11.9,0,0,1-3.475,8.442A11.749,11.749,0,0,1-2177.34,52.117Zm-.068-20.136a8.509,8.509,0,0,0-8.5,8.5,8.51,8.51,0,0,0,8.5,8.5,8.51,8.51,0,0,0,8.5-8.5A8.51,8.51,0,0,0-2177.408,31.982Z"
								transform="translate(2189.204 -28.241)"
								fill="#00ff5f"
								stroke="rgba(0,0,0,0)"
								stroke-miterlimit="10"
								stroke-width="1"
							/>
							<path
								id="Path_34202"
								d="M4.522,6.314A1.823,1.823,0,0,1,3.3,5.783L.486,2.5A1.5,1.5,0,0,1,.376.4h0A1.344,1.344,0,0,1,2.29.4L5.823,3.228a1.86,1.86,0,0,1,.4,1.974A1.841,1.841,0,0,1,4.6,6.376Z"
								transform="translate(21.242 21.217)"
								fill="#00ff5f"
								opacity="0.4"
							/>
						</g>
					</g>
				)}
			</g>
		</svg>
	);
};
