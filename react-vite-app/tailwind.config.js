/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        "gradient-start": "#7C94CC",
        "gradient-mid": "#eb5299",
        "gradient-end": "#ffc6dd",
        "gradient-light-start": "#B8BEEA",
        "gradient-light-mid": "#FEA8CB ",
        "gradient-light-end": "#FFE6F0",
        "selected-pink": "#fe87b7",
        "selected-blue": "#8dd3ef",
        "selected-pink-border": "#fd4f96",
        "selected-blue-border": "#48b8e6",
        "idle-pink": "#feb3d1",
        "idle-blue": "#d1edf9",
        "allCards-green": "#E0F0A4",
        "light-pink": "#fff8f8",
        "bold-pink": "#F21C80",
        "bold-blue": "#03B5E5",
        "bold-yellow": "#FFBD21",
        "bold-green": "#95AD2A",
        "teal-posts": "#5DB7AE",
        "fill-pink": "#FFEBF4",
        "bold-blue-hover": "#4DC5ED",
        "bold-pink-hover": "#F54E9D",
        "bold-green-hover": "#B8CC5E",
        "bold-yellow-hover": "#FFE066",
      },
    },
  },
  plugins: [require("tailwindcss-inner-border"), require("daisyui")],
};

