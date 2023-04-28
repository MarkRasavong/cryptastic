/** @type {import('tailwindcss').Config} */

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				darkBg: '#1f2128',
				/* darker than darkBg used for navbar, divs */
				darkNonIntComponentBg: '#191b1f',
				/* dark grey color for selection, input, dropdown, button, contrast for highlighting crypto */
				darkIntComponentBg: '#2c2f36',
				darkModeText: '#ffffff',
				darkGraphGreen: '#fe8c01',
				darkGraphBlue: '#1c529d',
				lightModeBgGray: '#f7f7f7',
				lightModeBgFooterMobile: 'rgb(211, 208, 201)',
				lightModeGraphGreen: '#5983be',
				lightModeGraphBlue: '#5983be',
				lightModeWhite: '#ffffff',
				lightModeText: '#2c2f36',
				cryptoGreen: '#06d554',
				cryptoRed: '#fe1040',
				cryptoSliderWhite: '#f7f7f7',
				darkModeSliderBlue: '#2172e5',
				darkModeSliderGreen: '#1ad761',
				darkModeSliderYellow: '#fe1040',
				darkModeSliderOrange: '#fe8c01',
				cryptoTextGreen: '#19811f',
			},
		},
	},
	plugins: [],
};
