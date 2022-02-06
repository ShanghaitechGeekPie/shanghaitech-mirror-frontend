import { useState } from 'react'
import { Link } from 'react-router-dom'
import List from '@mui/material/List'
import Collapse from '@mui/material/Collapse'
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
    <>
      <List component="div" sx={{ pt: 0 }}>
        <ListItemButton variant="drawer" onClick={doOpenSystem}>
          <ListItemText primary="System" sx={{ fontWeight: 'bold', fontSize: "0.9rem" }} />
          {openSystem ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openSystem} timeout="auto" unmountOnExit>
          <List component="div">
            {data.system.map((item) => (
              <ListItemButton
                component={Link}
                key={item.key}
                variant="drawer"
                to={'/help/' + item.key}
                onClick={props.handleDrawerToggle}
              >
                <ListItemText inset primary={item.title} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
        <ListItemButton variant="drawer" onClick={doOpenSoftware}>
          <ListItemText primary="Software" />
          {openSoftware ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openSoftware} timeout="auto" unmountOnExit>
          <List component="div">
            {data.software.map((item) => (
              <ListItemButton
                component={Link}
                key={item.key}
                variant="drawer"
                to={'/help/' + item.key}
                onClick={props.handleDrawerToggle}
              >
                <ListItemText inset primary={item.title} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </List>
    </>
  )
}