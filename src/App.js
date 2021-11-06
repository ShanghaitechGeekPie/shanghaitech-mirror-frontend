import * as React from 'react'
import GlobalStyles from '@mui/material/GlobalStyles'
import CssBaseline from '@mui/material/CssBaseline'
import Header from './components/Header'
import Footer from './components/Footer'
import Router from './router/index'

export default () => (
  <React.Fragment>
    <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
    <CssBaseline />
    <Header />
    <Router />
    <Footer />
  </React.Fragment>
)
