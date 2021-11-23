import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import MoodOutlinedIcon from '@mui/icons-material/MoodOutlined'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt'

export default () => {
  const news = require("@/assets/news.json")
  const data = []
  for (let key in news) {
    const value = news[key]
    data.push({
      id: key, title: value.title, time: value.time, icon: value.icon
    })
  }
  const icons = {
    "smile": <MoodOutlinedIcon color="secondary" />,
    "downtime": <ThumbDownAltIcon color="error" />
  }
  return (
    <Box>
      <Card elevation={3}>
        <CardContent sx={{ pb: 0 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>News</Typography>
        </CardContent>
        <List sx={{ pb: 0 }}>
          {data.map((item) => (
            <Box key={item.title}>
              <Divider component="li" />
              <ListItem disablePadding>
                <ListItemButton to={'/news/' + item.id} component={Link}>
                  <ListItemIcon>{icons[item.icon]}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            </Box>
          ))}
        </List>
      </Card>
    </Box>
  )
}