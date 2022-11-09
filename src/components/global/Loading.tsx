import { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import CircularProgress from '@mui/material/CircularProgress'

interface LoadingProps { isInline?: boolean }

export default (props: LoadingProps) => {
  const { isInline = false } = props
  const [isLoadingTooLong, setIsLoadingTooLong] = useState(false)
  useEffect(() => { setTimeout(() => { setIsLoadingTooLong(true) }, 5000) })

  return (
    <Paper
      variant={isInline ? 'outlined' : 'elevation'}
      elevation={isInline ? 0 : 3}
      sx={{ mx: 'auto', textAlign: 'center', paddingY: isInline ? 6 : 8 }}
    >
      <CircularProgress size={50} thickness={4} sx={{ marginBottom: 4 }} />
      <Typography component="div" variant="h5" sx={{ fontWeight: 'medium' }}>Loading</Typography>
      {isLoadingTooLong &&
        <Typography component="div" variant="body1" sx={{ marginTop: 2 }}>
          Wait in patient, it&#39;s going to be OK
        </Typography>
      }
    </Paper>
  )
}
