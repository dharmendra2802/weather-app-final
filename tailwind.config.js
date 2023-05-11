/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'sunny' : "url('/src/images/sunny.jpg')",
        'rainy' : "url('/src/images/rainy.jpg')",
        'snow' : "url('/src/images/snow.jpg')",
        'main' : "url('/src/images/main.jpg')",
        'cloudy' : "url('/src/images/cloudy.jpg')",
        'haze' : "url('/src/images/haze.jpg')",
      
      }
    },
  },
  plugins: [],
}


