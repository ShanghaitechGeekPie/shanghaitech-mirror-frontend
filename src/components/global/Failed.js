import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

export default () => (
  <Container maxWidth="lg" sx={{ pt: 8, pb: 6 }}>
    <Card>
      <CardContent>
        <Box sx={{ mx: 'auto', textAlign: 'center', pt: 4, pb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 'medium' }} gutterBottom>Failed</Typography>
        </Box>
      </CardContent>
    </Card>
  </Container>
)