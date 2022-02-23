import Typography from '@mui/material/Typography'

export default () => (
  <>
    <Typography
      component="h1" variant="h4"
      sx={{ fontWeight: "bold", marginTop: { lg: 4 }, marginBottom: 1 }}
    >
      Geekpie 为您提供镜像服务
    </Typography>
    <Typography
      component="h2" variant="h6"
      sx={{ marginBottom: { xs: 3, lg: 5 } }}
    >
      纯手工精心打造， 一切都触手可及
    </Typography>
  </>
)