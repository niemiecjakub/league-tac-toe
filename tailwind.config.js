/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily:{
      league: ['BeaufortforLOL', '"Beaufort for LOL"'],
      leagueheavy: ['BeaufortforLOL-Heavy', '"Beaufort for LOL Heavy"']
    },
    extend: {
      colors : {
        'league-blue': {
          100: '#CDFAFA',
          200: '#0AC8B9',
          300: '#0397AB',
          400: '#005A82',
          500: '#0A323C',
          600: '#0a1428',
          700: '#091428'
        },
        'league-gold' : {
          100: '#F0E6D2',
          200: '#C8AA6E',
          300: '#c8aa6e',
          400: '#c89b3c',
          500: '#785a28',
          600: '#463714'
        },
        'league-grey': {
          100: '#A09B8C',
          150: '#5b5a56',
          200: '#3c3c41',
          300: '#1e2328',
          400: '#1e282d',
        },
        'league-black':{
          100: "#010a13"
        }
      }
    },
  },
  plugins: [],
}

