import type { Config } from 'tailwindcss'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '450px'
      },
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
        'z-mauve': {
          50: '#f5e9f7',
          200: '#ddb3e4',
          500: '#ce93d8',
          700: '#ab47bc',
          900: '#674a6c',
        },
        'z-blue': {
          1: '#90caf9',
          2: '#42a5f5',
        },
        'z-dark': {
          1: '#121212',
        },
      },
    },
  },
  plugins: [],
} satisfies Config
