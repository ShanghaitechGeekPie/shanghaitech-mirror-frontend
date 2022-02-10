import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Mirrors from '@/components/views/HomeMirrors'
import News from '@/components/views/HomeNews'
import Tools from '@/components/views/HomeTools'
import Links from '@/components/views/HomeLinks'

export default () => (
  <Container maxWidth="lg">
    <Typography component="h1" variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>抽风、龟速、复古的镜像服务</Typography>
    <Typography component="h2" variant="h6" sx={{ mb: 6 }}>托管于华西教育网骨干节点张江理工学院</Typography>
    <Grid container spacing={4}>
      <Grid item xs={12} md={8}>
        <Mirrors />
      </Grid>
      <Grid item xs={12} md={4}>
        <News />
        <Tools />
        <Links />
      </Grid>
    </Grid>
  </Container>
)