/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{tsx,ts}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#DA4E1C',
        'primary-dark': '#1C1410',
        accent: '#F6B24A',
        'primary-light': '#F4793D',

        background: '#F5F1EB',
        surface: '#FFFFFF',
        'text-primary': '#1A1512',
        'text-secondary': '#7D7269',

        success: '#2F9A61',
        warning: '#EEA83B',
        error: '#C43A2D',
        info: '#2E6BD4',

        border: '#ECE3D9',
        disabled: '#B9AEA4',
        skeleton: '#EFE8DE',
        chip: '#F3ECE3',
        hero: '#211B16',
        cream: '#FFF3E6',
      },
      fontFamily: {
        poppins: ['Poppins_400Regular'],
        'poppins-medium': ['Poppins_500Medium'],
        'poppins-semibold': ['Poppins_600SemiBold'],
        'poppins-bold': ['Poppins_700Bold'],
        'poppins-light': ['Poppins_300Light'],
      },
    },
  },
  plugins: [],
};
