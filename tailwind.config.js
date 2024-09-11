/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        DuneRise: ["Dune Rise", "sans-serif"],
        // Add more custom font families as needed
      },
      colors: {
        primary: "#0FB4C3",
        primaryO: "rgba(15, 180, 195, 0.1)",
        primary1: "rgba(15, 180, 195, 0.5)",

        background: "#EEEEEE",
        layoutColor: "#F8F8FF",
        secondary: "#C0C0C0",
        BlackO: "#111111",
      },
      keyframes: {
        "grow-shrink": {
          "0%": { width: "0", opacity: "0" },
          "50%": { width: "100%", opacity: "1" },
          "75%": { width: "100%", opacity: "1" },
          "100%": { width: "0", opacity: "1" },
        },
      },
      animation: {
        "grow-shrink": "grow-shrink 6s ease-in-out", // Total duration (3s grow + 3s stay + 3s shrink)
      },
    },
  },
  plugins: [require("daisyui")],
};

// screens: {
//   'sm': '640px',
//   // => @media (min-width: 640px) { ... }

//   'md': '744px',
//   // => @media (min-width: 768px) { ... }

//   'lg': '1024px',
//   // => @media (min-width: 1024px) { ... }
