import { useLocation, Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'

export default () => {
  const location = useLocation()
  return (
    <Card>
      <CardContent>
        <Fade in={true} {...{ timeout: 1000 }}>
          <Box sx={{ mx: 'auto', textAlign: 'center', pt: 4, pb: 4 }}>
            <SentimentDissatisfiedIcon color="primary" sx={{ fontSize: "5rem", mb: 4 }} />
            <Typography
              component="div"
              variant="h5"
              sx={{ fontWeight: 'medium', mb: 4 }}
              gutterBottom
            >
              Oops, it failed!
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to={location.pathname.slice(0, location.pathname.slice(0, -1).lastIndexOf("/") + 1)}>
              Back
            </Button>
          </Box>
        </Fade>
      </CardContent>
    </Card>
  )
}