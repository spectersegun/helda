/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "rgb(239, 246, 255)",
          500: "rgb(102, 126, 234)",
          600: "rgb(79, 70, 229)",
        },
        "nigeria-green": "#1F664B",
        "light-green": "#3B8267",
        "deep-green": "#103B2B",
        "sky-blue": "#E6F1F3",
        lime: "#CBDF90",
      },
      fontFamily: {
        outfit: ["Outfit", "Helvetica", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
