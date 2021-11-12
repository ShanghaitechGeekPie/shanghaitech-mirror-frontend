import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'

export default () => (
  <Container maxWidth="lg" sx={{ pt: 8, pb: 6 }}>
    <Card>
      <CardContent>
        <CircularProgress />
        <Typography component="div" variant="h5" gutterBottom>Loading</Typography>
      </CardContent>
    </Card>
  </Container>
)