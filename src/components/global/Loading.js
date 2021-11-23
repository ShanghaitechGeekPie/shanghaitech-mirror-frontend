import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'

export default () => (
  <Card>
    <CardContent>
      <Box sx={{ mx: 'auto', textAlign: 'center', pt: 4, pb: 4 }}>
        <CircularProgress />
        <Typography variant="h5" sx={{ fontWeight: 'medium' }} gutterBottom>Loading</Typography>
      </Box>
    </CardContent>
  </Card>
)