import { useState } from 'react'
import { Link } from 'react-router-dom'
import Container from '@mui/material/Container'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListSubheader from '@mui/material/ListSubheader'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'


export default () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (status) => () => setOpen(status)
  return (
    <Container maxWidth="lg">
      <Button onClick={toggleDrawer(true)}>open</Button>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        ModalProps={{ keepMounted: true }}>
        <List sx={{ width: 250 }}>
          <ListSubheader>System</ListSubheader>
          <ListItem disablePadding>
            <ListItemButton to="#" component={Link}>
              <ListItemText primary="AOSP" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton to="#" component={Link}>
              <ListItemText primary="Archlinux" />
            </ListItemButton>
          </ListItem>
          <Divider component="li" />
          <ListSubheader>Software</ListSubheader>
          <ListItem disablePadding>
            <ListItemButton to="#" component={Link}>
              <ListItemText primary="Hola" />
            </ListItemButton>
          </ListItem>
        </List>
      </SwipeableDrawer>
    </Container>
  )
}