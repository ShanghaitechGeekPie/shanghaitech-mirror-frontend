import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import List from '@mui/material/List'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import MoodOutlinedIcon from '@mui/icons-material/MoodOutlined'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt'

export default () => {
  const news = require("@/assets/config/news.json")
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
    <Card elevation={3}>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Typography component="div" variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>News</Typography>
      </CardContent>
      <List component="div">
        {data.map((item) => (
          <Box key={item.title}>
            <Divider />
            <ListItemButton component="div" to={'/news/' + item.id} component={Link}>
              <ListItemIcon>{icons[item.icon]}</ListItemIcon>
              <ListItemText variant="button" primary={item.title} disableTypography />
            </ListItemButton>
          </Box>
        ))}
      </List>
    </Card>
  )
}