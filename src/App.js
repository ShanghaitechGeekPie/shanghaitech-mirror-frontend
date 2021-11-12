import * as React from 'react'
import GlobalStyles from '@mui/material/GlobalStyles'
import CssBaseline from '@mui/material/CssBaseline'
import Header from './components/Header'
import Footer from './components/Footer'
import Router from './router/index'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Theme from './styles/theme'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
      refetchOnMount: false
    }
  }
})

export default () => {
  const perferTheme = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light'
  const theme = React.useMemo(() => responsiveFontSizes(createTheme(Theme[perferTheme])), [perferTheme])
  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
          <CssBaseline />
          <Header />
          <Router />
          <Footer />
        </ThemeProvider>
      </QueryClientProvider>
    </React.Fragment>
  )
}
