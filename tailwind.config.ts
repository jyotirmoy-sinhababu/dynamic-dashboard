import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        abril: ['Abril Fatface', 'serif'],
        vollkorn: ['Vollkorn', 'serif'],
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0px)' },
        },
        slideInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0px)' },
        },
      },

      animation: {
        fadeInUp: 'fadeInUp 0.6s ease-out forwards',
        fadeInLeft: 'fadeInLeft 0.6s ease 0.3s forwards',
        slideInUp: 'slideInUp 0.6s ease 0.2s forwards',
      },
      boxShadow: {
        hover: '0 10px 20px rgba(0, 0, 0, 0.2)',
      },
      colors: {
        featuresCardDarkGrey: 'var(--color-featuresCard-grey)',
        white: 'var(--color-text-white)',
      },
    },
  },
  plugins: [],
};

export default config;
