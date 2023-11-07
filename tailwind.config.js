/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{html,js}', './components/**/*.{html,js}'],
  safelist: [
    'grid-cols-2',
    'grid-cols-3',
    'grid-cols-4',
    'grid-cols-5',
    'grid-cols-6',
    'grid-cols-7',
    'grid-cols-8',
    'grid-cols-9',
  ],
  theme: {
    fontFamily: {
      mono: ['IBM Plex Mono'],
      sans: ['Public Sans'],
      display: ['Detacher'],
    },
    colors: {
      gray: {
        90: '#1D1D26',
        20: '#aaa'
      }
    },
    extend: {
      colors: {
        background: '#07070D',
        foreground: '#c1c1c1',
        infoForeground: '#d7ff18c1',
        selectionBackground: '#39487e',
        selectionForeground: '#e2e2e2',
        selectionInactiveBackground: '#2c3d59',
        disabledForeground: '#a3a3a3',
        disabledBackground: '#222f44',
        inactiveBackground: '#325180',
        errorForeground: '#b5b5b5',
        disabledText: '#adadad',
        'Borders.ContrastBorderColor': '#0e1624',
        borderColor: '#1D1D26',
        disabledBorderColor: '#0d1022',
        focusColor: '#25334b',
        focusedBorderColor: '#2b416a',
        separatorColor: '#1d304b',
        lineNumbersColor: '#8d9296',
        text: '#FE458F',
      },
    },
  },
  plugins: [],
}
