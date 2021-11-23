import { Link } from 'react-router-dom'
import { useState } from 'react'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import IconButton from '@mui/material/IconButton'
import MoreIcon from '@mui/icons-material/MoreVert'
import Slide from '@mui/material/Slide'
import useScrollTrigger from '@mui/material/useScrollTrigger'

function HideOnScroll(props) {
  const { children, window } = props
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  })
  return (
    <Slide appear={false} direction="down" in={!trigger}>{children}</Slide>
  )
}

export default () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const isMenuOpen = Boolean(anchorEl)
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget)
  const handleMenuClose = () => setAnchorEl(null)
  return (
    <Box sx={{ flexGrow: 1, mb: 8 }}>
      <HideOnScroll>
        <AppBar color="primary" elevation={3}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>SHTU Open Source Mirror</Typography>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button variant="button" to='/' sx={{ my: 1, mx: 1.5 }} component={Link}>Home</Button>
              <Button variant="button" to='/help' sx={{ my: 1, mx: 1.5 }} component={Link}>Help</Button>
              <Button variant="button" to='/news' sx={{ my: 1, mx: 1.5 }} component={Link}>News</Button>
              <Button variant="button" to='/about' sx={{ my: 1, mx: 1.5 }} component={Link}>About</Button>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton size="large" aria-controls='menu' aria-haspopup="true" onClick={handleMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        id='menu'
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem sx={{ minWidth: 100 }} onClick={handleMenuClose} to='/' component={Link}>Home</MenuItem>
        <MenuItem onClick={handleMenuClose} to='/help' component={Link}>Help</MenuItem>
        <MenuItem onClick={handleMenuClose} to='/news' component={Link}>News</MenuItem>
        <MenuItem onClick={handleMenuClose} to='/about' component={Link}>About</MenuItem>
      </Menu>
    </Box>
  )
}