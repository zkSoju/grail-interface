module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neutral: {
          750: "#313131",
        },
      },
      fontFamily: {
        adhesion: "Adhesion",
        wagmi: "Gilroy",
      },
      boxShadow: {
        input: `
            0px 1px 0px -1px var(--tw-shadow-color),
            0px 1px 1px -1px var(--tw-shadow-color),
            0px 1px 2px -1px var(--tw-shadow-color),
            0px 2px 4px -2px var(--tw-shadow-color),
            0px 3px 6px -3px var(--tw-shadow-color)
          `,
        highlight: `
            inset 0px 0px 0px 1px var(--tw-shadow-color),
            inset 0px 1px 0px var(--tw-shadow-color)
          `,
      },
    },
  },
  plugins: [],
};
