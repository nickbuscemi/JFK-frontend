/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'purple': '#7a1fbb',
        'white': '#ffffff',
        'carolina': '#79add3',
        'deepCarolina': '#13294B'
      },
      fontWeight: {
        'bold': '700', // Standard bold
        'extra-bold': '800', // Even bolder
        // ... any additional font weights you need
      },
      spacing: {
        '96': '24rem', // 384px
        '128': '32rem', // 512px
        // Add more sizes as needed
      },
    },
  },
  plugins: [],
}

