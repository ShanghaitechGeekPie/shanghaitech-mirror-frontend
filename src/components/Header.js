import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default () => (
  <AppBar position="static" color="default" elevation={0}>
    <Toolbar sx={{ flexWrap: 'wrap' }}>
      <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
        SHTU Open Source Mirror
      </Typography>
      <Button variant="button" to='/' sx={{ my: 1, mx: 1.5 }} component={Link}>Home</Button>
      <Button variant="button" to='/help' sx={{ my: 1, mx: 1.5 }} component={Link}>Help</Button>
      <Button variant="button" to='/about' sx={{ my: 1, mx: 1.5 }} component={Link}>About</Button>
    </Toolbar>
  </AppBar>
)