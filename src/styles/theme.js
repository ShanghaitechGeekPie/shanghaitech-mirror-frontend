const lightPalette = {
  mode: 'light',
  primary: { main: '#b71c1c' },
  secondary: { main: "#ad1457" },
  error: { main: "#e53935" },
  warning: { main: "#ffa000" },
  info: { main: "#1565c0" },
  success: { main: "#2e7d32" }
}

const darPalette = {
  mode: 'dark',
  primary: { main: '#d32f2f' },
  secondary: { main: "#d81b60" },
  error: { main: "#ef5350" },
  warning: { main: "#ffc107" },
  info: { main: "#1976d2" },
  success: { main: "#4caf50" }
}

export default (darkMode) => {
  let theme = {
    palette: darkMode ? darPalette : lightPalette,
    shape: {
      borderRadius: 8
    },
    typography: {
      fontWeightMedium: 600
    },
    components: {
      MuiList: {
        defaultProps: {
          disablePadding: true
        }
      },
      MuiListItemButton: {
        variants: [{
          props: { variant: "drawer" },
          style: {
            width: "auto",
            borderRadius: "8px",
            marginLeft: "8px",
            marginRight: "8px",
            marginBottom: "6px",
            paddingTop: "8px",
            paddingBottom: "8px",
            paddingLeft: "16px",
            paddingRight: "16px"
          }
        }]
      },
      MuiListItemText: {
        styleOverrides: {
          root: {
            fontWeight: 'bold',
            fontSize: "0.9rem"
          }
        },
        defaultProps: {
          disableTypography: true
        }
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            paddingTop: "12px"
          }
        }
      }
    }
  }
  return theme
}
