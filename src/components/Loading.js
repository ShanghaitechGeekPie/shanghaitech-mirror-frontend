import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

export default () => (
  <Container maxWidth="lg" sx={{ pt: 8, pb: 6 }}>
    <Card>
      <CardContent>
        <Typography component="div" variant="h5" gutterBottom>Loading</Typography>
      </CardContent>
    </Card>
  </Container>
)