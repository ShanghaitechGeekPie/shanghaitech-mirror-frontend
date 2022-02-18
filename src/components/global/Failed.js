import { useLocation, Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'

export default ({ inline }) => {
  const location = useLocation()

  return (
    <Paper variant={inline ? "outlined" : "elevation"} elevation={inline ? 0 : 3}>
      <Fade in={true} {...{ timeout: 1000 }}>
        <Box sx={{ mx: 'auto', textAlign: 'center', paddingY: inline ? 4 : 8 }}>
          <SentimentDissatisfiedIcon color="primary" sx={{ fontSize: "5rem", marginBottom: 4 }} />
          <Typography
            component="div"
            variant="h5"
            sx={{ fontWeight: 'medium' }}
            gutterBottom
          >
            Oops, it failed!
          </Typography>
          {!inline &&
            <Button
              variant="contained"
              component={Link}
              sx={{ fontWeight: 'medium', marginTop: 4 }}
              to={location.pathname.slice(0, location.pathname.slice(0, -1).lastIndexOf("/") + 1)}
            >
              Back
            </Button>
          }
        </Box>
      </Fade>
    </Paper>
  )
}