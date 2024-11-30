import type { Config } from "tailwindcss";

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'z-green': {
          50: '#e6f8f4',
          100: '#b5ebdf',
          200: '#84ddca',
          300: '#52cfb5',
          400: '#39c9aa',
          500: '#08BB95',
          600: '#07a886',
          700: '#069677',
          800: '#068368',
          900: '#034b3c',
        },
      },
    },
  },
  plugins: [],
} satisfies Config
