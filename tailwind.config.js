/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{html,ts,tsx}'],
  darkMode: 'selector',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Arial', 'sans-serif'],
      },
      colors: {
        primary: `rgba(var(--primary), <alpha-value>)`,
        secondary: `rgba(var(--secondary), <alpha-value>)`,
        typo: {
          primary: `rgba(var(--text-primary), <alpha-value>)`,
          secondary: `rgba(var(--text-secondary), <alpha-value>)`,
          invert: `rgba(var(--primary), <alpha-value>)`,
          invertSecondary: `rgba(var(--secondary), <alpha-value>)`,
        },
        blue: {
          1: `rgba(var(--blue-1), <alpha-value>)`,
          2: `rgba(var(--blue-2), <alpha-value>)`,
        },
        black: {
          1: `rgba(var(--black-1), <alpha-value>)`,
          2: `rgba(var(--black-2), <alpha-value>)`,
          3: `rgba(var(--black-3), <alpha-value>)`,
          4: `rgba(var(--black-4), <alpha-value>)`,
          5: `rgba(var(--black-5), <alpha-value>)`,
        },
        white: {
          1: `rgba(var(--white-1), <alpha-value>)`,
          2: `rgba(var(--white-2), <alpha-value>)`,
        },
      },
    },
  },
  plugins: [],
};