import ReactDOM from 'react-dom/client'
import { HashRouter } from "react-router-dom"

import App from './App'

import './style/reset.css'
import './style/systems.css'
import './style/app.css'
import './style/toggles-and-functionality.css'
import './style/icons.css'
import './style/modal.css'
import './style/login.css'
import './style/custom-player-ui.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
      <App />
  </HashRouter>
)
