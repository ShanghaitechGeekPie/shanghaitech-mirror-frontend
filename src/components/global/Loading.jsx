import { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import CircularProgress from '@mui/material/CircularProgress'

export default ({ inline }) => {
  const [isLoadingTooLong, setIsLoadingTooLong] = useState(false)
  useEffect(() => { setTimeout(() => { setIsLoadingTooLong(true) }, 5000) })

  return (
    <Paper
      variant={inline ? "outlined" : "elevation"}
      elevation={inline ? 0 : 3}
      sx={{ mx: 'auto', textAlign: 'center', paddingY: inline ? 6 : 8 }}
    >
      <CircularProgress size={50} thickness={4} sx={{ marginBottom: 4 }} />
      <Typography component="div" variant="h5" sx={{ fontWeight: 'medium' }}>Loading</Typography>
      {isLoadingTooLong &&
        <Typography component="div" variant="body1" sx={{ marginTop: 2 }}>Wait in patient, it's going to be OK</Typography>
      }
    </Paper>
  )
}