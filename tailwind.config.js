/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#090D16",
        surface: {
          50: "#1E2638",
          100: "#151B28",
          200: "#0F1420",
          DEFAULT: "#0F1420",
        },
        brand: {
          50: "#EEF2FF",
          100: "#E0E7FF",
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-sm': '0 0 20px -5px rgba(99, 102, 241, 0.15)',
        'glow': '0 0 35px -5px rgba(99, 102, 241, 0.25)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
