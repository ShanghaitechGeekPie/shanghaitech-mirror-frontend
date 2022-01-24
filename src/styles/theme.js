const lightPalette = {
  mode: 'light',
  primary: {
    main: '#b71c1c'
  },
  secondary: {
    main: "#ad1457"
  },
  error: {
    main: "#e53935"
  },
  warning: {
    main: "#ffa000"
  },
  info: {
    main: "#1565c0"
  },
  success: {
    main: "#2e7d32"
  }
}

const darPalette = {
  mode: 'dark',
  primary: {
    main: '#d32f2f'
  },
  secondary: {
    main: "#d81b60"
  },
  error: {
    main: "#ef5350"
  },
  warning: {
    main: "#ffc107"
  },
  info: {
    main: "#1976d2"
  },
  success: {
    main: "#4caf50"
  }
}

export default (darkMode) => {
  let theme = {
    palette: darkMode ? darPalette : lightPalette,
    shape: {
      borderRadius: 12
    },
    typography: {
      fontWeightMedium: 600
    }
  }
  return theme
}
