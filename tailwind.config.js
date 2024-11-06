import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [childrenVariantPlugin()],
}

function childrenVariantPlugin() {
  return plugin(({ addVariant }) => addVariant('children', '& > *'))
}
