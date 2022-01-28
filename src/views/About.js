import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Rating from '@mui/material/Rating'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'

export default () => {
  return (
    <Container maxWidth="lg">
      <Grid container alignItems="flex" spacing={4}>
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardMedia component="img" image="https://sist.shanghaitech.edu.cn/_upload/article/images/9b/f6/88d02686447ea6265581235d1c51/84f80642-009c-41c3-903f-7449ac09a5ab.jpg"/>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }} gutterBottom>Geekpie</Typography>
              <Typography variant="body1" paragraph gutterBottom>整个About页面各位随便发挥呀QAQ...</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }} gutterBottom>Rate us!</Typography>
              <Rating defaultValue={4} size="large" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}