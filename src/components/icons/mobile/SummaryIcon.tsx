import React from 'react';

interface SummaryIconProps {
	darkMode?: boolean;
	selected?: boolean;
	className?: string;
}

export const SummaryIcon: React.FC<SummaryIconProps> = ({ selected, darkMode, className }) => {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			width="56"
			height="49.027"
			viewBox="0 0 56 49.027"
		>
			<g id="Group_3657" data-name="Group 3657" transform="translate(472.203 -786.973)">
				<text
					id="Summary"
					fill={darkMode ? '#fff' : selected ? '#00ff5f' : '#000'}
					transform="translate(-472.203 832)"
					font-size="11"
					font-family="Poppins, sans-serif"
					font-weight="600"
				>
					<tspan x="0" y="0">
						Summary
					</tspan>
				</text>
				{!selected ? (
					<g
						id="Iconly_Broken_Activity"
						data-name="Iconly/Broken/Activity"
						transform="translate(-460.759 784.214)"
					>
						<g id="Activity" transform="translate(2.759 2.759)">
							<path
								id="Activity-2"
								data-name="Activity"
								d="M14.217,27.592a1.022,1.022,0,0,1-1.024-1.009,1.035,1.035,0,0,1,1.024-1.022H18.29c4.035,0,6.267-2.214,6.3-6.253v-8.93a1.006,1.006,0,1,1,2.013,0v8.93c0,5.109-3.195,8.284-8.315,8.284ZM0,19.308V9.368c0-5.122,3.182-8.3,8.3-8.3h8.975A1.025,1.025,0,0,1,18.29,2.092,1.013,1.013,0,0,1,17.265,3.1H8.3c-4.035,0-6.267,2.226-6.267,6.265v9.94c0,4.039,2.231,6.253,6.267,6.253a1.035,1.035,0,0,1,1.024,1.022A1.022,1.022,0,0,1,8.3,27.592C3.182,27.592,0,24.417,0,19.308Zm6.413-.839a1.022,1.022,0,0,1-.183-1.424l3.987-5.183a1.027,1.027,0,0,1,1.439-.183L15.4,14.612l3.293-4.2a1.011,1.011,0,0,1,1.584,1.217l-3.9,5.025a1.088,1.088,0,0,1-.683.389,1.024,1.024,0,0,1-.744-.219L11.2,13.894,7.84,18.261a1.017,1.017,0,0,1-.816.412A1.016,1.016,0,0,1,6.413,18.468ZM20.423,3.59a3.586,3.586,0,1,1,3.585,3.564A3.567,3.567,0,0,1,20.423,3.59Zm2.036,0a1.548,1.548,0,1,0,1.548-1.546A1.548,1.548,0,0,0,22.459,3.59Z"
								fill={darkMode ? '#fff' : '#000'}
							/>
						</g>
					</g>
				) : (
					<g
						id="Iconly_Bulk_Activity"
						data-name="Iconly/Bulk/Activity"
						transform="translate(-461.184 783.363)"
					>
						<g id="Activity" transform="translate(2.759 2.759)">
							<path
								id="Path_34168"
								d="M18.008,25.6H7.6a7.7,7.7,0,0,1-5.6-2.007A7.682,7.682,0,0,1,0,18.006V7.617a7.72,7.72,0,0,1,2.005-5.6A7.68,7.68,0,0,1,7.6,0h11.33a5.56,5.56,0,0,0-.1,1.05,5.73,5.73,0,0,0,5.728,5.719,5.89,5.89,0,0,0,1.038-.1V18.006a7.687,7.687,0,0,1-2,5.585A7.682,7.682,0,0,1,18.008,25.6ZM10.271,10.068a1.069,1.069,0,0,0-.14.009,1.053,1.053,0,0,0-.7.412l-4.2,5.419a1.036,1.036,0,0,0-.225.65,1.051,1.051,0,0,0,1.939.612l3.513-4.546,3.9,3.06a1.062,1.062,0,0,0,.66.232,1.054,1.054,0,0,0,.841-.42l4.064-5.244v-.026a1.066,1.066,0,0,0-.2-1.486,1.038,1.038,0,0,0-1.476.212l-3.426,4.408-3.9-3.072A1.055,1.055,0,0,0,10.271,10.068Z"
								transform="translate(0 2.844)"
								fill="#00ff5f"
							/>
							<circle
								id="Ellipse_742"
								cx="3.555"
								cy="3.555"
								r="3.555"
								transform="translate(21.333)"
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
