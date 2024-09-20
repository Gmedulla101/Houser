/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xmd: '800px',
        xsm: '720px',
      },
    },
  },
  plugins: [],
};
