module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,html}'
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          500: '#6366F1'
        }
        ,
        darkAdventure: {
          DEFAULT: '#0F172A',
          secondary: '#020617',
          card: '#1E293B',
          accentPrimary: '#7C3AED',
          accentSecondary: '#22D3EE',
          textPrimary: '#E5E7EB',
          textSecondary: '#94A3B8',
          borders: '#334155'
        }
      },
      boxShadow: {
        soft: '0 8px 30px rgba(2,6,23,0.08)'
      }
      ,
      backgroundImage: {
        'dark-gradient': 'linear-gradient(90deg,#071430 0%, #0b1a3a 50%, #0f172a 100%)',
        'accent-gradient': 'linear-gradient(90deg, var(--accent-start), var(--accent-end))'
      },
      transitionDuration: {
        DEFAULT: '300ms'
      }
    }
  },
  plugins: []
}
