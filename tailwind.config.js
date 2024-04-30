/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
            'nunito': ['Nunito', 'sans-serif'],
            'gruppo': ['Gruppo', 'sans-serif'],
        },
        colors: {
            'primary': '#aaccf8',
            'background' : '#fefefe',
        }
    },
  },
  plugins: [],
}

