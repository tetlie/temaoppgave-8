module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Helvetica Neue"],
      },
      screens: {
        "3xl": "2000px",
      },
      colors: {
        accent: {
          100: "#FAFAFA",
          200: "#EAEAEA",
          300: "#999",
          400: "#888",
          500: "#666",
          600: "#444",
          700: "#333",
          800: "#111",
        },
        daccent: {
          100: "#111",
          200: "#333",
          300: "#444",
          400: "#666",
          500: "#888",
          600: "#999",
          700: "#EAEAEA",
          800: "#FAFAFA",
        },
        success: {
          lighter: "#D3E5FF",
          light: "#3291FF",
          default: "#0070F3",
          dark: "#0761D1",
        },
        error: {
          lighter: "#F7D4D6",
          light: "#FF1A1A",
          default: "#E00",
          dark: "#C50000",
        },
        warning: {
          lighter: "#FFEFCF",
          light: "#F7B955",
          default: "#F5A623",
          dark: "#AB570A",
        },
        violet: {
          lighter: "#E3D7FC",
          light: "#8A63D2",
          default: "#7928CA",
          dark: "#4C2889",
        },
        cyan: {
          lighter: "#AAFFEC",
          light: "#79FFE1",
          default: "#50E3C2",
          dark: "#29BC9B",
        },
        highlight: {
          lighter: "#F81CE5",
          light: "#EB367F",
          default: "#FF0080",
          dark: "#FFF500",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
