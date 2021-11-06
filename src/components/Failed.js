import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

export default () => (
  <Box sx={{ mt: 4, mb: 6 }}>
    <Card>
      <CardContent>
        <Typography component="div" variant="h5" gutterBottom>Failed</Typography>
      </CardContent>
    </Card>
  </Box>
)