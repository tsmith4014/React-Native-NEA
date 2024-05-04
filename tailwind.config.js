/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,jsx,ts,tsx}',
        './components/**/*.{js,jsx,ts,tsx}',
        './constants/**/*.{js,jsx,ts,tsx}',
        './infrastructure/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                bold: ['MontserratBold'],
                semibold: ['MontserratSemiBold'],
                regular: ['Montserrat'],
            },
            colors: {
                springBG: '#F6FCF8',
                spring30: '#A5E0B5',
                spring40: '#6ECD88',
                spring50: '#4AC16A',
                spring60: '#319FSF',
                spring70: '#147952',
                spring80: '#106142',
                blueEbony: '#252642',
                gray10: '#F#F#F#',
                gray20: '#CECED0',
                gray30: '#B6B6B9',
                gray40: '#9F9FA3',
                gray60: '#78787C',
                gray70: '#SDSD61',
                gray90: '#0B0B14',
                white: '#FFFFFF',
                success: '#07D95A',
                error: '#FF5722',
                info: '#29B6F6',
                warning: '#FFA000',
            },
        },
    },
    plugins: [],
};
