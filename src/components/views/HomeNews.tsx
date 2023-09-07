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
import EmoticonOutline from 'mdi-material-ui/EmoticonOutline'
import ThumbDownOutline from 'mdi-material-ui/ThumbDownOutline'
import _newsList from '@/assets/metadata/news.json'

const icons: { [key: string]: JSX.Element } = {
  smile: <EmoticonOutline color="secondary" />,
  downtime: <ThumbDownOutline color="error" />
}

interface NewsListProps { title: string, time: string, icon: string }

const newsList: { [key: string]: NewsListProps } = _newsList

export default () => (
  <Card elevation={3}>
    <CardContent sx={{ paddingBottom: 0 }}>
      <Typography component="div" variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>News</Typography>
    </CardContent>
    <List component="div">
      {Object.entries(newsList).map(([key, value]) => (
        <Box key={value.title}>
          <Divider />
          <ListItemButton to={'/news/' + key} component={Link}>
            <ListItemIcon>{icons[value.icon]}</ListItemIcon>
            <ListItemText variant="button" primary={value.title} disableTypography />
          </ListItemButton>
        </Box>
      ))}
    </List>
  </Card>
)
