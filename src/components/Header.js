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

export default () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const isMenuOpen = Boolean(anchorEl)
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget)
  const handleMenuClose = () => setAnchorEl(null)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            SHTU Open Source Mirror
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button variant="button" to='/' sx={{ my: 1, mx: 1.5 }} component={Link}>Home</Button>
          <Button variant="button" to='/help' sx={{ my: 1, mx: 1.5 }} component={Link}>Help</Button>
          <Button variant="button" to='/about' sx={{ my: 1, mx: 1.5 }} component={Link}>About</Button>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" aria-controls='menu' aria-haspopup="true" onClick={handleMenuOpen} color="inherit">
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
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
        <MenuItem onClick={handleMenuClose} to='/' component={Link}>Home</MenuItem>
        <MenuItem onClick={handleMenuClose} to='/help' component={Link}>Help</MenuItem>
        <MenuItem onClick={handleMenuClose} to='/about' component={Link}>About</MenuItem>
      </Menu>
    </Box>
  )
}