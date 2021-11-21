import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'

export default () => (
  <Container maxWidth="lg" sx={{ pt: 8, pb: 6 }}>
    <Card>
      <CardContent>
        <Box sx={{ mx: 'auto', textAlign: 'center', pt: 4, pb: 4 }}>
          <CircularProgress />
          <Typography variant="h5" sx={{ fontWeight: 'medium' }} gutterBottom>Loading</Typography>
        </Box>
      </CardContent>
    </Card>
  </Container>
)