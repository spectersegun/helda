/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: true,
  theme: {
    extend: {
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0, transform: "translateY(12px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        pop: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.03)" },
          "100%": { transform: "scale(1)" },
        },
        float: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
          "100%": { transform: "translateY(0)" },
        },
        "glow-pulse": {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(31,102,75,0.45)" },
          "50%": { boxShadow: "0 0 0 12px rgba(31,102,75,0)" },
        },
        "fade-in2": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-down": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in .6s ease-out both",
        "fade-in2": "fade-in .5s ease-in-out both",
        "fade-in-down": "fade-in-down .6s ease-out both",

        pop: "pop .25s ease-out",
        float: "float 4s ease-in-out infinite",
        "glow-pulse": "glow-pulse 1.8s ease-out infinite",
      },
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
