import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Mirrors from '@/components/views/Mirrors'
import News from '@/components/views/News'

export default () => (
  <Container maxWidth="lg">
    <Typography variant="h4" sx={{ fontWeight: 'bold' }} gutterBottom>抽风、龟速、复古的镜像服务</Typography>
    <Typography variant="h6" gutterBottom sx={{ mb: 8 }}>托管于华西教育网骨干节点张江理工学院</Typography>
    <Grid container alignItems="flex" spacing={4}>
      <Grid item xs={12} md={8}>
        <Mirrors />
      </Grid>
      <Grid item xs={12} md={4}>
        <News />
      </Grid>
    </Grid>
  </Container>
)