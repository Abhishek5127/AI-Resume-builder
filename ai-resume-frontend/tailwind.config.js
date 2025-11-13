/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#eeeeee",
          300: "#e0e0e0",
          600: "#757575",
          700: "#616161",
          800: "#424242",
          900: "#212121"
        },
        blue: {
          600: "#2563eb",
          700: "#1d4ed8"
        },
        green: {
          600: "#16a34a",
          700: "#15803d"
        }
      }
    }
  },
  plugins: []
};
