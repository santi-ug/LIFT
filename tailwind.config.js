/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#5F48D9",
				secondary: {
					DEFAULT: "#745EE1",
					light: "#C0ABFF",
					dark: "#5F48D9",
				},
				search: '#A0AEC0',
				background: "#171328",
				black: {
					DEFAULT: "#000",
					100: "#1E1E2D",
					200: "#232533",
				},
				gray: {
					light: "#E5E4ED",
					dark: "#9390A1",
				},
			},
			fontFamily: {
				iregular: ["Inter-Regular", "sans-serif"],
				imedium: ["Inter-Medium", "sans-serif"],
				isemibold: ["Inter-SemiBold", "sans-serif"],
				ibold: ["Inter-Bold", "sans-serif"],
			},
			backgroundImage: {
				main: "url('./assets/home.png')",
			},
		},
	},
	plugins: [],
};
