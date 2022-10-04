import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

import '@fontsource/roboto/latin-300.css'
import '@fontsource/roboto/latin-500.css'
import '@fontsource/roboto/latin-700.css'
import '@fontsource/roboto/latin-900.css'

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)