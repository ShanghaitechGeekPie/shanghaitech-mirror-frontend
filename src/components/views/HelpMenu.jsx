import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import List from '@mui/material/List'
import Collapse from '@mui/material/Collapse'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { ChevronUp, ChevronDown } from 'mdi-material-ui'
import HelpConfig from '@/assets/config/help.json'

const getHelpMenu = () => {
  const data = {"system": [], "software": []}
  for (let type in HelpConfig)
    for (let key in HelpConfig[type]) {
      const value = HelpConfig[type][key]
      data[type].push({
        key: key, title: value.display
      })
    }
  return data
}

export default ({ handleDrawerToggle }) => {
  const location = useLocation()
  const helpMenuData = getHelpMenu()
  const isMobileScreen = useMediaQuery(useTheme().breakpoints.down('lg'))

  const [showSystem, setShowSysyem] = useState(true)
  const [showSoftware, setshowSoftware] = useState(true)
  const doShowSystem = () => setShowSysyem(!showSystem)
  const doShowSoftware = () => setshowSoftware(!showSoftware)

  return (
    <>
      <List component="div">
        <ListItemButton variant="drawer" onClick={doShowSystem}>
          <ListItemText variant="button" primary="System" disableTypography />
          {showSystem ? <ChevronUp /> : <ChevronDown />}
        </ListItemButton>
        <Collapse in={showSystem} timeout="auto" unmountOnExit>
          <List component="div">
            {helpMenuData.system.map((item) => (
              <ListItemButton
                component={Link}
                key={item.key}
                variant="drawer"
                to={'/help/' + item.key}
                onClick={isMobileScreen ? handleDrawerToggle : null}
                selected={location.pathname == '/help/' + item.key}
              >
                <ListItemText variant="button" inset primary={item.title} disableTypography />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
        <ListItemButton variant="drawer" onClick={doShowSoftware}>
          <ListItemText variant="button" primary="Software" disableTypography />
          {showSoftware ? <ChevronUp /> : <ChevronDown />}
        </ListItemButton>
        <Collapse in={showSoftware} timeout="auto" unmountOnExit>
          <List component="div">
            {helpMenuData.software.map((item) => (
              <ListItemButton
                component={Link}
                key={item.key}
                variant="drawer"
                to={'/help/' + item.key}
                onClick={isMobileScreen ? handleDrawerToggle : null}
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