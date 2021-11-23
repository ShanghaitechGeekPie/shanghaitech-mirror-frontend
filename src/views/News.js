import { Link } from 'react-router-dom'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

export default () => {
  const news = require("@/assets/news.json")
  const data = []
  for (let key in news) {
    const value = news[key]
    data.push({
      id: key, title: value.title, time: value.time, icon: value.icon
    })
  }
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 4 }} gutterBottom>News</Typography>
      {data.map((item) => (
        <Card key={item.title} elevation={3} sx={{ mb: 4 }}>
          <CardActionArea to={'/news/' + item.id} component={Link}>
            <CardContent sx={{ px: 2, py: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }} gutterBottom>{item.title}</Typography>
              <Typography variant="subtitle1">{item.time}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Container>
  )
}