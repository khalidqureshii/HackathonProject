/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '90vh':'90vh',
      },
      width: {
        '90vw':'90vw',
      },
      backgroundColor: {
        'default-bg': '#e3f2fd', // Example default background color
      },
      colors: {
        customBlue: '#42a5f5', // Add your custom color here
      },
      fontFamily: {
        cambria: ['Cambria', 'serif'], // Add Cambria as a custom font family
      },
    },
  },
  plugins: [],
}



