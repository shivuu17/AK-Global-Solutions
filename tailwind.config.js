/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#111111",
          bg: "#F7F7F5",
          "bg-alt": "#EEEEEB",
          accent: "#D85B3F",
          muted: "#6B6B67",
          border: "#D9D9D4",
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      letterSpacing: {
        architectural: '0.15em',
        widest: '0.25em',
      },
      maxWidth: {
        'site': '1380px',
      }
    },
  },
  plugins: [],
}
