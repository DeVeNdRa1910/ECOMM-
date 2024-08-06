/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      boxShadow: {
        'right': '4px 0 6px -1px rgba(0, 0, 0, 0.1), 4px 0 4px -1px rgba(0, 0, 0, 0.06)', // Right shadow
        'left': '-4px 0 6px -1px rgba(0, 0, 0, 0.1), -4px 0 4px -1px rgba(0, 0, 0, 0.06)', // Left shadow
        'top': '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -4px 4px -1px rgba(0, 0, 0, 0.06)', // Top shadow
        'bottom': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 4px 4px -1px rgba(0, 0, 0, 0.06)' // Bottom shadow
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

