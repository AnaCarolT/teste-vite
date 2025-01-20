/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            '*, p, div': {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              wordBreak: 'break-word',
              whiteSpace: 'normal',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Plugin de tipografia para texto rico
  ],
};
