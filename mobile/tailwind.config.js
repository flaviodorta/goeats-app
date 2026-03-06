/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{tsx,ts}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Principais
        primary: '#E53935',
        'primary-dark': '#B71C1C',
        accent: '#FF6F61',
        'primary-light': '#FF8A80',

        // Neutras
        background: '#FFF5F5',
        'text-primary': '#212121',
        'text-secondary': '#757575',
        surface: '#FFFFFF',

        // Semânticas
        success: '#4CAF50',
        warning: '#FFA726',
        error: '#D32F2F',
        info: '#1976D2',

        // Auxiliares
        border: '#E0E0E0',
        disabled: '#BDBDBD',
        skeleton: '#F0F0F0',
      },
      fontFamily: {
        'poppins': ['Poppins_400Regular'],
        'poppins-medium': ['Poppins_500Medium'],
        'poppins-semibold': ['Poppins_600SemiBold'],
        'poppins-bold': ['Poppins_700Bold'],
        'poppins-light': ['Poppins_300Light'],
      },
    },
  },
  plugins: [],
};
