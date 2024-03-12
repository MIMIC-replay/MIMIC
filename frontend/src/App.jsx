import { useState, useEffect } from "react"

import SiteHeader from "./components/SiteHeader"
import LeftBar from "./components/LeftBar"
import MainContentArea from "./components/MainContentArea"

import sessionService from "./services/sessions"

function App() {
  const [sessions, setSessions] = useState([])
  
  useEffect(() => {
    sessionService.getSessions().then((r) => setSessions(r) )
  }, [])

  return (
    <div className="main-grid">
      <SiteHeader/>
      <LeftBar sessions={sessions}/>
      <MainContentArea/>
      
    </div>
  )
}

export default App
