import { useLocation, Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import { EmoticonSadOutline } from 'mdi-material-ui'

export default ({ isInline = false, hasButton = false }) => {
  const location = useLocation()
  const lastPageLink = location.pathname.slice(0, location.pathname.slice(0, -1).lastIndexOf("/") + 1)

  return (
    <Paper
      variant={isInline ? "outlined" : "elevation"}
      elevation={isInline ? 0 : 3}
    >
      <Fade in={true} {...{ timeout: 1000 }}>
        <Box sx={{ mx: 'auto', textAlign: 'center', paddingY: isInline ? 6 : 8 }}>
          <EmoticonSadOutline color="primary" sx={{ fontSize: "5rem", marginBottom: 4 }} />
          <Typography component="div" variant="h5" sx={{ fontWeight: 'medium' }}>
            Oops, it failed!
          </Typography>
          {
            hasButton &&
            <Button variant="contained" component={Link} sx={{ marginTop: 4 }} to={lastPageLink}>
              Back
            </Button>
          }
        </Box>
      </Fade>
    </Paper>
  )
}