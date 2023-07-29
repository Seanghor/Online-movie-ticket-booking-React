const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */
// const colors = require('tailwindcss/colors')
module.exports = {
  // content: ["./src/**/*.{html,ts, tsx}"],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        animatedgradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      backgroundSize: {
        '300%': '300%',
      },
      animation: {
        gradient: 'animatedgradient 6s ease infinite alternate',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        my_bg_image: "url('../public/images/login_background.png')"
      },
      colors: {
        nav: "#111827",
        footer: "#111827",
        aba: "#015e7b",

        primary: {
          normal: '#0e6431',
          hover: '#0d5a2c',
          active: '#0b5027'
        },
        slate: {
          normal: "#F8FAFC"
        },

        bank: {
          aba: "#015e7b"
        },
        red: {
          normal: '#ff4444',
          hover: '#e63d3d',
          active: '#cc3636'
        },
        black: {
          normal: '#052311'
        },
        light: {
          normal: '#e7f0ea',
          hover: '#dbe8e0',
          active: '#b4cfbf'
        },
        dark: {
          normal: '#052311',
          hover: '#083c1d',
          active: '#062d16'
        },
        grey: {
          normal: '#808080',
          dark: '#302E2E',
          light: '#898686'
        },
      },

    }
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true })
  ],
}