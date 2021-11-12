import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Mirrors from '../components/Mirrors'
import News from '../components/News'

export default () => (
  <Container maxWidth="lg" sx={{ pt: 8, pb: 6 }}>
    <Typography variant="h1" variant="h4" sx={{ fontWeight: 'bold' }} gutterBottom>抽风、龟速、复古的镜像服务</Typography>
    <Typography variant="h2" variant="h6" gutterBottom>托管于华西教育网骨干节点张江理工学院</Typography>
    <Grid container spacing={5}>
      <Grid item xs={12} md={8}>
        <Mirrors />
      </Grid>
      <Grid item xs={12} md={4}>
        <News />
      </Grid>
    </Grid>
  </Container>
)