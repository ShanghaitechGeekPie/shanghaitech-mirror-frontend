import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Mirrors from '@/components/views/HomeMirrors'
import Title from '@/components/views/HomeTitle'
import News from '@/components/views/HomeNews'
import Tools from '@/components/views/HomeTools'
import Links from '@/components/views/HomeLinks'

export default () => (
  <Container maxWidth="lg">
    <Title />
    <Grid container spacing={4}>
      <Grid item xs={12} md={8}>
        <Mirrors />
      </Grid>
      <Grid item xs={12} md={4}>
        <Stack spacing={4}>
          <News />
          <Tools />
          <Links />
        </Stack>
      </Grid>
    </Grid>
  </Container>
)