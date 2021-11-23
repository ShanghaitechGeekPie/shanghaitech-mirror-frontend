import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

export default () => (
  <AppBar position="static" color="primary" sx={{ top: 'auto', bottom: 0, mt: 8 }}>
    <Container maxWidth="lg">
      <Toolbar>
        <Grid container alignItems="flex" spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="body1">What is this</Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="body1">© 2021 Geekpie</Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </Container>
  </AppBar>
)