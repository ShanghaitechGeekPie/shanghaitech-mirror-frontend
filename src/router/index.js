import { Switch, Route } from 'react-router-dom'
import Home from '../views/Home'
import Help from '../views/Help'
import About from '../views/About'
import Explorer from '../views/Explorer'

export default () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route exact path='/help' component={Help} />
    <Route exact path='/about' component={About} />
    <Route path='/' component={Explorer}/>
  </Switch>
)