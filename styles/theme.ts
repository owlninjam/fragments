export const islamicTheme = {
  colors: {
    primary: {
      DEFAULT: '#006400', // Islamic Green
      light: '#008000',
      dark: '#004d00',
    },
    secondary: {
      DEFAULT: '#FFD700', // Gold
      light: '#FFE55C',
      dark: '#B8860B',
    },
    accent: {
      DEFAULT: '#FFFFFF', // White
      light: '#F5F5F5',
      dark: '#E8E8E8',
    },
    background: {
      light: '#F8F9FA',
      dark: '#1A1A1A',
    },
    text: {
      light: '#2D2D2D',
      dark: '#F5F5F5',
    },
  },
  fonts: {
    arabic: '"Noto Naskh Arabic", serif',
    primary: '"Noto Sans", sans-serif',
    decorative: '"Noto Kufi Arabic", sans-serif',
  },
  patterns: {
    geometric: {
      star8: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0l12.5 37.5L100 50l-37.5 12.5L50 100l-12.5-37.5L0 50l37.5-12.5z' fill='%23006400' fill-opacity='0.1'/%3E%3C/svg%3E")`,
      arabesque: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 0c33.137 0 60 26.863 60 60s-26.863 60-60 60S0 93.137 0 60 26.863 0 60 0zm0 10c-27.614 0-50 22.386-50 50s22.386 50 50 50 50-22.386 50-50-22.386-50-50-50z' fill='%23FFD700' fill-opacity='0.1'/%3E%3C/svg%3E")`,
    },
  },
  animations: {
    transition: {
      DEFAULT: 'all 0.3s ease-in-out',
      slow: 'all 0.5s ease-in-out',
      fast: 'all 0.2s ease-in-out',
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      slideIn: {
        '0%': { transform: 'translateY(20px)', opacity: '0' },
        '100%': { transform: 'translateY(0)', opacity: '1' },
      },
      rotate: {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
      },
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  },
}
