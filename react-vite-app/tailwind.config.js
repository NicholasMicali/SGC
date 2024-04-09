/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors:
      {
        'gradient-start': '#7C94CC',
        'gradient-mid': '#eb5299',
        'gradient-end': '#ffc6dd',
        'selected-pink': "rgba(254, 135, 183, 1)",
        'selected-blue': "rgba(141, 211, 239, 1)",
        'idle-pink': "rgba(254, 179, 209, 1)",
        'idle-blue': "rgba(209, 237, 249, 1)",
      }
    },
  },
  plugins: [],
}

