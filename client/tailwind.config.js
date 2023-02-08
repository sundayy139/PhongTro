/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      width: {
        '1100': '1100px',
      },
      backgroundColor: {
        "primary": "#f5f5f5",
        "secondary1": "#1266dd",
        "secondary2": "#f73859",
        "overlay-3": "rgba(0, 0, 0, 0.3)"
      },
      colors: {
        "primary": '#1266dd',
        "secondary": '#f73859',
        "orange": "#f60"
      },
      maxWidth: {
        "600": "600px",
        "1100": "1100px",
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}