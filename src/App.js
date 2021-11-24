import GlobalStyles from '@mui/material/GlobalStyles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Header from '@/components/global/Header'
import Router from '@/router/index'
import { useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import getTheme from '@/styles/theme'

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
  const location = useLocation()
  const darkmode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = responsiveFontSizes(createTheme(getTheme(darkmode)))
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
        <CssBaseline />
        <Header />
        <Box sx={{ pb: 8 }}>
          <Router />
        </Box>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
