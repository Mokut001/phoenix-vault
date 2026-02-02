/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        phoenix: {
          gold: '#FFD700',
          fire: '#FF4500',
          dark: '#1A1A1A',
        }
      }
    },
  },
  plugins: [],
}