/* eslint-disable lines-around-comment */
import { ThemeOptions, PaletteOptions } from '@mui/material'

const lightPalette = {
  mode: 'light',
  primary: { main: '#b71c1c' },
  secondary: { main: '#ad1457' },
  error: { main: '#e53935' },
  warning: { main: '#ffa000' },
  info: { main: '#1565c0' },
  success: { main: '#2e7d32' },
  action: { selectedOpacity: 0.1 },
  background: {
    paper: '#fff8f5',
    default: '#fff6f4'
  }
} as PaletteOptions

const darkPalette = {
  mode: 'dark',
  primary: { main: '#e53935' },
  secondary: { main: '#d81b60' },
  error: { main: '#ef5350' },
  warning: { main: '#ffc107' },
  info: { main: '#1976d2' },
  success: { main: '#4caf50' },
  action: { selectedOpacity: 0.5 },
  background: {
    paper: '#0f0909',
    default: '#181211'
  }
} as PaletteOptions

declare module '@mui/material/ListItemButton' {
  interface ListItemButtonBaseProps {
    variant?: string
  }
}

declare module '@mui/material/ListItemText' {
  interface ListItemTextProps {
    variant?: string
  }
}

const theme = (mode: boolean): ThemeOptions => ({
  /*
    Z-index of the MuiDrawer is 1200 by default. So set
    the MuiAppBar z-index to 1201 to make it always on top.
  */
  zIndex: {
    appBar: 1201
  },
  shape: {
    borderRadius: 8
  },
  typography: {
    fontWeightLight: 300,
    fontWeightRegular: 500,
    fontWeightMedium: 700,
    fontWeightBold: 900
  },

  components: {
    MuiList: {
      defaultProps: {
        disablePadding: true
      }
    },
    MuiListItemButton: {
      variants: [{
        props: { variant: 'drawer' },
        style: {
          width: 'auto',
          borderRadius: '8px',
          marginLeft: '8px',
          marginRight: '8px',
          marginBottom: '8px',
          paddingTop: '8px',
          paddingBottom: '8px',
          paddingLeft: '16px',
          paddingRight: '16px'
        }
      }]
    },

    /*
      The button font style should be used with disableTypography prop
      because the text in the ListItemText is wrapped by Typography.
      You can find examples in App.js, Home(News|Tools|Links).js and so on.
    */
    MuiListItemText: {
      variants: [{
        props: { variant: 'button' },
        style: {
          fontWeight: 'bold',
          fontSize: '0.9rem'
        }
      }]
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          paddingTop: '12px'
        }
      }
    }
  },
  palette: mode ? darkPalette : lightPalette
})

export default theme
