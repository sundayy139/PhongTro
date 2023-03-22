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
      },
      screens: {
        'phone': { 'min': '0', 'max': '576px' },
        'tablet': { 'min': '577px', 'max': '992px' },
        'laptop': { 'min': '993px', 'max': '1200px' },
        'pc': '1201px',
      },
      keyframes: {
        "slide-right": {
          "0%": {
            "-webkit-transform": "translateX(0)",
            transform: "translateX(0)"
          },
          "100%": {
            "-webkit-transform": "translateX(300px)",
            transform: "translateX(300px)"
          }
        },
        "slide-left": {
          "0%": {
            "-webkit-transform": "translateX(300px)",
            transform: "translateX(300px)"
          },
          "100%": {
            "-webkit-transform": "translateX(0)",
            transform: "translateX(0)"
          }
        },
      },
      animation: {
        "slide-right": "slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "slide-left": "slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
      },
      boxShadow: {
        'custom': '0 0 5px 0 rgba(0,0,0,.1)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}