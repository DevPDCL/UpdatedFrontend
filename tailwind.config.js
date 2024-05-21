/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      animation: {
        blink: "blink 1s linear infinite",
        blob: "blob 5s infinite",
      },
      keyframes: {
        ping: {
          "0%, 70%, 100%": { opacity: 1 },
          "35%": { opacity: 0 },
        },
        blob: {
          "0%": {
            transform: "translate(0px,0px) scale(1)",
          },
          "33%": {
            transform: "translate(-60px,50px) scale(1.3)",
          },
          "66%": {
            transform: "translate(60px,100px) scale(0.8)",
          },
          "100%": {
            transform: "translate(0px,0px) scale(1)",
          },
        },
      },
      fontFamily: {
        ubuntu: ["ubuntu"],
      },
      colors: {
        primary: "#645050",
        secondary: "#01DF74",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
        "PDCL-green": "#006642",
      },
      lighting: {
        neon: "text-white text-shadow-lg stroke-2 stroke-white",
      },

      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "300px",
      },
      width: {
        content: "fit-content",
      },
      backgroundImage: {},
    },
  },

  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".gradient-alt-flow": {
          backgroundImage:
            "linear-gradient(to right, #006642, #00d4ff 40%, #006642 80%)",
          backgroundSize: "200% 100%",
          animation: "flow 5s linear infinite",
          "@keyframes flow": {
            "0%": { backgroundPosition: "100% 0" },
            "100%": { backgroundPosition: "-100% 0" },
          },
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        },
        ".gradient-sidebar-flow": {
          backgroundImage:
            "linear-gradient(to right, #00664a, #585858 40%, #00664a 80%)",
          backgroundSize: "200% 100%",
          animation: "flow 5s linear infinite",
          "@keyframes flow": {
            "0%": { backgroundPosition: "100% 0" },
            "100%": { backgroundPosition: "-100% 0" },
          },
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        },
      });
    },
  ],
};
