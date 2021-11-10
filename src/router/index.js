import { Routes, Route, useLocation } from 'react-router-dom'
import Home from '../views/Home'
import Help from '../views/Help'
import About from '../views/About'
import Explorer from '../views/Explorer'

export default () => {
  const location = useLocation()
  return (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='help' element={<Help />} />
    <Route path='about' element={<About />} />
    <Route path='*' element={<Explorer key={location.pathname} />}/>
  </Routes>
  )
}