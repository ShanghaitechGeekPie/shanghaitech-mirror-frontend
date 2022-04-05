import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { unstable_ClassNameGenerator } from '@mui/material/className'
import { styled, useTheme, ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles'
import { Scrollbars } from 'react-custom-scrollbars'
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
      refetchOnWindowFocus: false,
      refetchOnMount: false
    }
  }
})

const drawerWidth = 300

const navLinks = [
  { name: "Home", link: "/", icon: <Home /> },
  { name: "Help", link: "/help", icon: <HelpBox /> },
  { name: "About", link: "/about", icon: <Information /> }
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
          <CssBaseline enableColorScheme />
          <AppBar position="fixed">
            <Toolbar>
              <IconButton onClick={handleDrawerToggle} sx={{ marginRight: 3 }} aria-label="Open Drawer">
                <Menu sx={{ color: "white" }} />
              </IconButton>
              <Typography variant="h6" component="div">Geekpie Open Source Mirror</Typography>
            </Toolbar>
          </AppBar>
          <Box sx={{ width: { sm: drawerWidth } }}>
            <Drawer
              variant={isMobileScreen ? "temporary" : "persistent"}
              open={drawerOpen}
              onClose={handleDrawerToggle}
              ModalProps={{ keepMounted: true }}
              sx={{ '& .drawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
            >
              <Scrollbars autoHide autoHideTimeout={200}>
                <Toolbar />
                <Box sx={{ overflow: "auto" }}>
                  {NavItems}
                  {location.pathname.startsWith("/help") && <HelpMenu handleDrawerToggle={handleDrawerToggle} />}
                </Box>
              </Scrollbars>
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