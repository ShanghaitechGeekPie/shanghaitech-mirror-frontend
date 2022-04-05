import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import List from '@mui/material/List'
import Collapse from '@mui/material/Collapse'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { ChevronUp, ChevronDown } from 'mdi-material-ui'

const getHelpMenu = () => {
  const data = {
    "system": [],
    "software": []
  }
  const help = require("@/assets/config/help.json")
  for (let type in help)
    for (let key in help[type]) {
      const value = help[type][key]
      data[type].push({
        key: key, title: value.display
      })
    }
  return data
}

export default ({ handleDrawerToggle }) => {
  const location = useLocation()
  const [openSystem, setOpenSysyem] = useState(true)
  const [openSoftware, setopenSoftware] = useState(true)
  const doOpenSystem = () => setOpenSysyem(!openSystem)
  const doOpenSoftware = () => setopenSoftware(!openSoftware)
  const data = getHelpMenu()

  return (
    <>
      <List component="div">
        <ListItemButton variant="drawer" onClick={doOpenSystem}>
          <ListItemText variant="button" primary="System" disableTypography />
          {openSystem ? <ChevronUp /> : <ChevronDown />}
        </ListItemButton>
        <Collapse in={openSystem} timeout="auto" unmountOnExit>
          <List component="div">
            {data.system.map((item) => (
              <ListItemButton
                component={Link}
                key={item.key}
                variant="drawer"
                to={'/help/' + item.key}
                onClick={handleDrawerToggle}
                selected={location.pathname == '/help/' + item.key}
              >
                <ListItemText variant="button" inset primary={item.title} disableTypography />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
        <ListItemButton variant="drawer" onClick={doOpenSoftware}>
          <ListItemText variant="button" primary="Software" disableTypography />
          {openSoftware ? <ChevronUp /> : <ChevronDown />}
        </ListItemButton>
        <Collapse in={openSoftware} timeout="auto" unmountOnExit>
          <List component="div">
            {data.software.map((item) => (
              <ListItemButton
                component={Link}
                key={item.key}
                variant="drawer"
                to={'/help/' + item.key}
                onClick={handleDrawerToggle}
                selected={location.pathname == '/help/' + item.key}
              >
                <ListItemText variant="button" inset primary={item.title} disableTypography />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </List>
    </>
  )
}