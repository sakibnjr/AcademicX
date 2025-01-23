/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#408beb",
        primaryLight: "#6ea7f0",
        primaryDark: "#1870e0",
        text: "#232629",
        subtitle: "#5e656e",
        background: "#eff0f1",
      },
    },
  },
  plugins: [require("daisyui")],
};
