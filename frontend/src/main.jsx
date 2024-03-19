// import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { CustomScroll } from 'react-custom-scroll';

import App from './App'

import './style/reset.css'
import './style/systems.css'
import './style/app.css'
import './style/toggles-and-functionality.css'
import './style/icons.css'
// import './style/unminified-rrplayer.css'
import './style/modal.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CustomScroll>
      <App />
    </CustomScroll>
  </BrowserRouter>
)
