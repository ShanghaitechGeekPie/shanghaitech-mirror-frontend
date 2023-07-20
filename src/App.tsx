import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { unstable_ClassNameGenerator } from '@mui/material/className'
import { styled, useTheme, ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles'
import getTheme from '@/styles/theme'
import CssBaseline from '@mui/material/CssBaseline'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { zhCN } from '@mui/material/locale'
import { Menu, Home, HelpBox, Information } from 'mdi-material-ui'
import HelpMenu from '@/components/views/HelpMenu'
import Router from '@/router/index'

unstable_ClassNameGenerator.configure((componentName) =>
  componentName.replace('Mui', '').toLowerCase()
)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 10 * 60 * 1000,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      networkMode: 'offlineFirst'
    }
  }
})

const drawerWidth = 300

const navLinks = [
  { name: 'Home', link: '/', icon: <Home /> },
  { name: 'Help', link: '/help', icon: <HelpBox /> },
  { name: 'About', link: '/about', icon: <Information /> }
]

interface MainProps {
  open: boolean
}

const Main = styled('main')<MainProps>(({ theme, open }) => ({
  flexGrow: 1,
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(6),
  [theme.breakpoints.up('lg')]: {
    marginLeft: `-${drawerWidth}px`,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
      marginLeft: 0,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    })
  }
}))

export default () => {
  const location = useLocation()
  const darkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = responsiveFontSizes(createTheme(getTheme(darkMode), zhCN))
  const isMobileScreen = useMediaQuery(useTheme().breakpoints.down('lg'))

  const [showDrawer, setShowDrawer] = useState(false)
  const handleDrawerToggle = () => setShowDrawer(!showDrawer)

  const NavItems = () => (
    <List sx={{ marginTop: 1 }}>
      {navLinks.map((item) => (
        <ListItemButton
          component={Link}
          key={item.name}
          variant="drawer"
          to={item.link}
          onClick={isMobileScreen ? handleDrawerToggle : undefined}
          selected={location.pathname === item.link}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText variant="button" primary={item.name} disableTypography />
        </ListItemButton>
      ))}
    </List>
  )

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: { lg: 'flex' } }}>
          <CssBaseline enableColorScheme />
          <AppBar position="fixed">
            <Toolbar>
              <IconButton onClick={handleDrawerToggle} sx={{ marginRight: 3 }} aria-label="Open Drawer">
                <Menu sx={{ color: 'white' }} />
              </IconButton>
              <Typography variant="h6" component="div">GeekPie Open Source Mirror</Typography>
            </Toolbar>
          </AppBar>
          <Box sx={{ width: { sm: drawerWidth } }}>
            <Drawer
              variant={isMobileScreen ? 'temporary' : 'persistent'}
              open={showDrawer}
              onClose={handleDrawerToggle}
              ModalProps={{ keepMounted: true }}
              sx={{
                '& .drawer-paper': {
                  minHeight: '100vh',
                  boxSizing: 'border-box',
                  overflow: 'hidden',
                  width: drawerWidth
                }
              }}
            >
              <Toolbar />
              <Paper square sx={{ overflow: 'auto', height: '100%' }}>
                <NavItems />
                {location.pathname.startsWith('/help') && <HelpMenu handleDrawerToggle={handleDrawerToggle} />}
              </Paper>
            </Drawer>
          </Box>
          <Main open={showDrawer}>
            <Toolbar />
            <Router />
          </Main>
        </Box>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
