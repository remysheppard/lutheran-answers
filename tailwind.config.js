module.exports = {
	content: ['./hugo_stats.json'],
	plugins: [
    require('@tailwindcss/forms'),		
		require('@tailwindcss/typography'),
    require('tailwindcss-brand-colors'),
	],
	theme: {
		extend: {
			colors: {
				'brand-yellow': '#eab308',
				'brand-red': '#a15f5f',
				'brand-black': '#2a1a1f',
				'brand-purple': '#E2AEDD',
			},
		},
	},
};
