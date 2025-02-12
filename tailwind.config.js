/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': "linear-gradient(to right, #6541c1 0%, #d43396 98%, #d43396 100%)",
      },
    },
  },
  plugins: [],
}