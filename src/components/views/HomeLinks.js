import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import List from '@mui/material/List'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import HomeIcon from '@mui/icons-material/Home'

export default () => {
  const data = [
    { "title": "Shanghaitech Offical", "href": "https://www.shanghaitech.edu.cn", "icon": <HomeIcon /> }
  ]

  return (
    <Card elevation={3}>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Typography component="div" variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>Links</Typography>
      </CardContent>
      <List component="div">
        {data.map((item) => (
          <Box key={item.title}>
            <Divider />
            <ListItemButton component="div" href={item.href} rel="noopener" target="_blank" component={Link}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText variant="button" primary={item.title} disableTypography />
            </ListItemButton>
          </Box>
        ))}
      </List>
    </Card>
  )
}