/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xmd: '800px',
        xsm: '720px',
        xxsm: '500px',
      },
    },
  },
  plugins: [daisyui],
};
