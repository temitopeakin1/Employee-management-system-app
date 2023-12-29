/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      display: ['Montserrat', 'sans-serif'],
      body: ['Montserrat', 'sans-serif'],
      satoshi: ['Satoshi', 'sans-serif'],
      title: ['Manrope', 'sans-serif'],
      copy: ['Plus Jakarta Sans', 'sans-serif']
    },
    extend: {
      fontSize: {
        8:  '8px',
        12: '12px',
        14: '14px',
        16: '16px',
        24: '24px',
        25: '25px',
        45: '45px',
        50: '50px',
        sm: '0.85rem',
      },
      fontWeight: {
        bold: '700',
      },
      backgroundColor: {
        'main-bg': '#F9F9F9',
        'main-dark-bg': '#20232A',
        'secondary-dark-bg': '#33373E',
        'light-gray': '#F7F7F7',
        hover: '#ff0000',
        'half-transparent': 'rgba(0, 0, 0, 0.5)',
      },
      borderWidth: {
        1: '1px',
      },
      borderRadius: {
        '1xl': '.5rem',
      },
      borderColor: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      width: {
        400: '400px',
        550: '550px',
        500: '500px',
        760: '760px',
        780: '780px',
        800: '800px',
        1000: '1000px',
        1200: '1200px',
        1400: '1400px',
      },
      height: {
        80: '80px',
        300: '300px',
        400: '400px',
        256: '256px',
        512: '512px'
      },
      minHeight: {
        590: '590px',
      },
      backgroundImage: {
        'hero-pattern': "url('https://i.ibb.co/MkvLDfb/Rectangle-4389.png')",
      },
    },
  },
  plugins: [],
}
