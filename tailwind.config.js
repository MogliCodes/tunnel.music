/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{html,js}',
        './components/**/*.{html,js}',
    ],
    safelist: ['grid-cols-6'],
  theme: {
    fontFamily: {
        mono: ['IBM Plex Mono'],
      sans: ['Poppins'],
      display: ['Chewy'],
    },
    extend: {
      colors: {
          "background": "#1c2739",
          "foreground": "#c1c1c1",
          "infoForeground": "#d7ff18c1",
          "selectionBackground": "#39487e",
          "selectionForeground": "#e2e2e2",
          "selectionInactiveBackground": "#2c3d59",
          "disabledForeground": "#a3a3a3",
          "disabledBackground": "#222f44",
          "inactiveBackground": "#325180",
          "errorForeground": "#b5b5b5",
          "disabledText": "#adadad",
          "Borders.ContrastBorderColor" : "#0e1624",
          "borderColor": "#151d2c",
          "disabledBorderColor": "#0d1022",
          "focusColor" : "#25334b",
          "focusedBorderColor": "#2b416a",
          "separatorColor": "#1d304b",
          "lineNumbersColor": "#8d9296",
          "text": "#ffca1ec0"
      }
    },
  },
  plugins: [],
}
