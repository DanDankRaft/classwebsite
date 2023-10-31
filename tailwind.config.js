/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundSize: {
        'size-200': '200% 200%',
        'size-400': '400% 400%',
      },
      backgroundPosition: {
          'pos-0': '0% 0%',
          'pos-90': '95% 95%',
          'pos-100': '100% 100%',
      },
      colors: {
        background: "rgb(var(--background-rgb))",
        foreground: "rgb(var(--foreground-rgb))",
        transparent: "transparent",
        websitered: '#F32C2C',
        websiteorange: '#F7823A',
        websiteyellow: '#F7D93A',
        websitegreen: '#62DA67',
        websitecyan: '#62D3DA',
        websiteblue: '#333D95',
        websitepurple: '#682878'
      }
    },

  },
  plugins: [],
}
