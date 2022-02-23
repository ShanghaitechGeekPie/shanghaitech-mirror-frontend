import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { unstable_ClassNameGenerator } from '@mui/material/utils'
import { styled, useTheme, ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles'
import getTheme from '@/styles/theme'
import CssBaseline from '@mui/material/CssBaseline'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
import HelpCenterIcon from '@mui/icons-material/HelpCenter'
import InfoIcon from '@mui/icons-material/Info'
import HelpMenu from '@/components/views/HelpMenu'
import Router from '@/router/index'

unstable_ClassNameGenerator.configure((componentName) =>
  componentName.replace('Mui', '')
)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
      refetchOnMount: false
    }
  }
})

const drawerWidth = 300

const navLinks = [
  { name: "Home", link: "/", icon: <HomeIcon /> },
  { name: "Help", link: "/help", icon: <HelpCenterIcon /> },
  { name: "About", link: "/about", icon: <InfoIcon /> }
]

const Main = styled('main')(({ theme, open }) => ({
  flexGrow: 1,
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(6),
  [theme.breakpoints.up('lg')]: {
    marginLeft: `-${drawerWidth}px`,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
      marginLeft: 0,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    })
  }
}))

export default () => {
  const location = useLocation()
  const darkmode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = responsiveFontSizes(createTheme(getTheme(darkmode)))
  const isMobileScreen = useMediaQuery(useTheme().breakpoints.down('lg'))

  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  }

  const NavItems = (
    <List sx={{ marginTop: 1 }}>
      {navLinks.map((item) => (
        <ListItemButton
          component={Link}
          key={item.name}
          variant="drawer"
          to={item.link}
          onClick={handleDrawerToggle}
          selected={location.pathname == item.link}
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
          <CssBaseline />
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
              <IconButton onClick={handleDrawerToggle} sx={{ marginRight: 3 }} aria-label="Open Drawer">
                <MenuIcon sx={{ color: "white" }} />
              </IconButton>
              <Typography variant="h6" component="div">Geekpie Open Source Mirror</Typography>
            </Toolbar>
          </AppBar>
          <Box sx={{ width: { sm: drawerWidth } }}>
            <Drawer
              variant={isMobileScreen ? "temporary" : "persistent"}
              open={drawerOpen}
              onClose={handleDrawerToggle}
              sx={{ '& .Drawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
            >
              <Toolbar />
              <Box sx={{ overflow: "auto" }}>
                {NavItems}
                {location.pathname.startsWith("/help") && <HelpMenu handleDrawerToggle={handleDrawerToggle} />}
              </Box>
            </Drawer>
          </Box>
          <Main open={drawerOpen}>
            <Toolbar />
            <Router />
          </Main>
        </Box>
      </ThemeProvider>
    </QueryClientProvider>
  )
}