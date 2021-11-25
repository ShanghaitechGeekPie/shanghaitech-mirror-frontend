import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)