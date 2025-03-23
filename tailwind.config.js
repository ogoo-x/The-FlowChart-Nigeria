/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: { 
        'custom-pink': '#B94A75', 
        'custom-red': '#782835', 
        'custom-black': '#3F413C', 
        'custom-white': '#fff9f5',
    }, 
    },
  },
  plugins: [],
}

