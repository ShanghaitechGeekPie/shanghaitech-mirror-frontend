import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import helpConfig from '@/assets/metadata/help.json'

interface HelpMenuProps { handleDrawerToggle: () => void }

export default ({ handleDrawerToggle }: HelpMenuProps) => {
  const location = useLocation()
  const isMobileScreen = useMediaQuery(useTheme().breakpoints.down('lg'))

  return (
    location.pathname.startsWith('/help') && (
      <List component="div">
        {Object.entries(helpConfig).map((item) => (
          <ListItemButton
            component={Link}
            key={item[0]}
            variant="drawer"
            to={'/help/' + item[0]}
            onClick={isMobileScreen ? handleDrawerToggle : undefined}
            selected={location.pathname === '/help/' + item[0]}
          >
            <ListItemText variant="button" inset primary={item[1]} disableTypography />
          </ListItemButton>
        ))}
      </List>
    )
  )
}
