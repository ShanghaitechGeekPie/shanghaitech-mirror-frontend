import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import ShanghaiTechLogo from '@/assets/img/shanghaitech_logo.svg'
import GeekpieLogo from '@/assets/img/geekpie_logo.svg'

export default () => {
  return (
    <Container maxWidth="lg">
      <Grid container alignItems="flex" spacing={4}>
        <Grid item xs={12} md={4}>
          <Card elevation={3} sx={{ mb: 4 }}>
            <CardMedia component="img" image={ShanghaiTechLogo} />
          </Card>
          <Card elevation={3}>
            <CardMedia component="img" image={GeekpieLogo} />
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card elevation={3}>
            <CardContent>
            <Stack spacing={3}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>ShanghaiTech Open Source Mirror</Typography>
              <Typography variant="body1">Created by Geekpie</Typography>
              <Typography variant="h6">Source Code</Typography>
              <Link
                underline="none"
                rel="noopener"
                target="_blank"
                href="https://gitlab.isp.moe/geekpie/shanghaitech-mirror-frontend"
                sx={{ fontWeight: 'medium' }}
              >
                GitLab
              </Link>
              <Typography variant="h6">Special thanks to</Typography>
              <Link
                underline="none"
                rel="noopener"
                target="_blank"
                href="https://library.shanghaitech.edu.cn"
                sx={{ fontWeight: 'medium' }}
              >
                ShanghaiTech Library
              </Link>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}