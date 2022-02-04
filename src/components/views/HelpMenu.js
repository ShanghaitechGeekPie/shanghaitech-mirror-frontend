import { useState } from 'react'
import { Link } from 'react-router-dom'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import Collapse from '@mui/material/Collapse'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

const getHelpMenu = () => {
  const data = {
    "system": [],
    "software": []
  }
  const help = require("@/assets/help.json")
  for (let type in help)
    for (let key in help[type]) {
      const value = help[type][key]
      data[type].push({
        key: key, title: value.display
      })
    }
  return data
}

export default (props) => {
  const [openSystem, setOpenSysyem] = useState(true)
  const [openSoftware, setopenSoftware] = useState(true)
  const doOpenSystem = () => setOpenSysyem(!openSystem)
  const doOpenSoftware = () => setopenSoftware(!openSoftware)
  const data = getHelpMenu()

  return (
    <List component="div" sx={{ width: "17.5rem", pt: 0 }}>
      <ListItemButton onClick={doOpenSystem}>
        <ListItemText primary="System" />
        {openSystem ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openSystem} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {data.system.map((item) => (
            <ListItem component="div" key={item.key} disablePadding>
              <ListItemButton
                component={Link}
                to={'/help/' + item.key}
                onClick={props.handleDrawerToggle}
              >
                <ListItemText inset primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
      <Divider component="li" />
      <ListItemButton onClick={doOpenSoftware}>
        <ListItemText primary="Software" />
        {openSoftware ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openSoftware} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {data.software.map((item) => (
            <ListItem component="div" key={item.key} disablePadding>
              <ListItemButton to={'/help/' + item.key} component={Link}>
                <ListItemText inset primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </List>
  )
}