import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import CircularProgress from '@mui/material/CircularProgress'

export default ({ inline }) => (
  <Paper
    variant={inline ? "outlined" : "elevation"}
    elevation={inline ? 0 : 3}
    sx={{ mx: 'auto', textAlign: 'center', paddingTop: 4, paddingBottom: 4 }}
  >
    <CircularProgress size={50} thickness={4} sx={{ marginBottom: 4 }} />
    <Typography component="div" variant="h5" sx={{ fontWeight: 'medium' }} gutterBottom>Loading</Typography>
  </Paper>
)