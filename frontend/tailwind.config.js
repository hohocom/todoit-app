// tailwind.config.js
module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        "apple-hard": ["apple-h"],
        "apple-bold": ["apple-b"],
        "apple-light": ["apple-l"],
        "apple-regular": ["apple-r"],
        "apple-tiny": ["apple-t"],
        "noto-regular": ["noto-regular"],
        "noto-bold": ["noto-bold"],
        "noto-black": ["noto-black"],
        "noto-thin": ["noto-thin"],
        "noto-light": ["noto-light"],
        "noto-medium": ["noto-medium"],
      },
    },
  },
  variants: {},
  plugins: [],
};
