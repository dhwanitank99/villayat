const { colors: defaultColors } = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

const colors = {
  ...defaultColors,
  ...{
    'cadet-blue': {
      DEFAULT: '#27a9e1',
      100: '#a9ddf3',
      200: '#7dcbed',
      300: '#52bae7',
      400: '#1d7fa9',
    },
    'slate-gray': '#dae0e8',
    'cyber-grape': '#4d4c7b',
  },
};

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: colors,
    backgroundSize: {
      auto: 'auto',
      cover: 'cover',
      contain: 'contain',
      line: '100% 1rem',
    },
    extend: {
      fontFamily: {
        body: ['Montserrat', 'sans-serif'],
        title: ['Raleway', 'sans-serif'],
        head: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        tiny: '.7rem',
      },
      outline: {
        test: '2px solid black',
      },
      height: {
        'custom-mobile': '26rem',
        'mobile-xs': '16rem',
        max: 'max-content',
      },
      maxWidth: {
        tiny: '16rem',
      },
    },
  },
  variants: {
    extend: {
      display: ['group-hover'],
      transform: ['active', 'hover', 'focus'],
      scale: ['active', 'group-hover'],
      height: ['hover', 'focus'],
      width: ['hover', 'focus'],
      fontSize: ['hover', 'focus'],
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
  corePlugins: {
    boxSizing: true,
  },
};
