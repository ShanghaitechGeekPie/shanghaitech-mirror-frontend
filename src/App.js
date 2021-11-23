import { Fragment } from 'react'
import GlobalStyles from '@mui/material/GlobalStyles'
import CssBaseline from '@mui/material/CssBaseline'
import Header from '@/components/global/Header'
import Footer from '@/components/global/Footer'
import Router from '@/router/index'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import getTheme from '@/styles/theme'
import '@/styles/transition.css'

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
  const darkmode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = responsiveFontSizes(createTheme(getTheme(darkmode)))
  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
          <CssBaseline />
          <Header />
          <Router />
          <Footer />
        </ThemeProvider>
      </QueryClientProvider>
    </Fragment>
  )
}
