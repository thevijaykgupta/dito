/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-outfit)', 'Poppins', 'Sora', 'sans-serif'],
        display: ['Kepler', 'Utopia', 'Playfair Display', 'serif'],
        cursive: ['Fruitinger', 'Pacifico', 'cursive'],
      },
      colors: {
        brand: {
          primary: '#0f1a3d',
          secondary: '#0f1a3d',
          accent: '#FCD34D',
          purple: '#0f1a3d',
          'light-purple': '#0f1a3d',
        },
        glass: {
          white: 'rgba(255, 255, 255, 0.1)',
          dark: 'rgba(0, 0, 0, 0.1)',
          blur: 'rgba(255, 255, 255, 0.05)',
        },
        emotion: {
          happy: '#FCD34D',
          calm: '#4F46E5',
          energetic: '#EF4444',
          focused: '#10B981',
        },
        gold: {
          DEFAULT: '#FCD34D',
          400: '#FCD34D',
          glow: '#FCD34D',
        },
        'dark-primary': '#0f172a',
        'dark-secondary': '#1e293b',
        'dark-accent': '#3b0764',
        'tuffly-blue': '#0f1a3d',
        'tuffly-purple': '#0f1a3d',
        'tuffly-gold': '#FCD34D',
        'tuffly-cyan': '#22d3ee',
        'tuffly-slate': '#1e293b',
        'tuffly-background': '#0f1a3d',
        'oc-blue-6': '#228be6',
        'oc-violet-6': '#845ef7',
        'oc-yellow-5': '#fab005',
        'oc-cyan-5': '#3bc9db',
        'oc-gray-0': '#f8f9fa',
        'oc-gray-9': '#212529',
        'oc-pink-5': '#f06595',
        'oc-orange-5': '#fd7e14',
        'oc-teal-5': '#20c997',
        'oc-lime-5': '#94d82d',
        'oc-red-5': '#fa5252',
        'oc-green-5': '#40c057',
      },
      backgroundImage: {
        'day-gradient': 'linear-gradient(to bottom right, #e0f7fa, #cfd9df, #f2f2f2)',
        'night-gradient': 'linear-gradient(to bottom right, #0f172a, #1e293b, #3b0764)',
        'premium-gradient': 'linear-gradient(135deg, #0f1a3d 0%, #0f1a3d 50%, #FCD34D 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 100%)',
        'tuffly-gradient': 'linear-gradient(to top right, #0f1a3d, #0f1a3d, #FCD34D)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
        shimmer: 'shimmer 2s linear infinite',
        'bounce-gentle': 'bounce-gentle 2s infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(255, 215, 0, 0.8)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)',
            transform: 'scale(1)',
          },
          '50%': {
            boxShadow: '0 0 30px rgba(255, 215, 0, 0.6)',
            transform: 'scale(1.05)',
          },
        },
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        glow: '0 0 20px rgba(255, 215, 0, 0.5)',
        'glow-strong': '0 0 30px rgba(255, 215, 0, 0.8)',
        'card-hover': '0 20px 40px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};

module.exports = config;