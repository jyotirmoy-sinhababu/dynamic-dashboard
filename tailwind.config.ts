import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        abril: ['Abril Fatface', 'serif'],
        vollkorn: ['Vollkorn', 'serif'],
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: 0, transform: 'translateX(-20px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        slideInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
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
        featuresCardDarkGrey: '#3A3A3A',
        white: '#FFFFFF',
      },
    },
  },
  plugins: [],
};

export default config;
