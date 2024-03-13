import { useState, useEffect } from "react"

import SiteHeader from "./components/SiteHeader"
import LeftBar from "./components/LeftBar"
import MainContentArea from "./components/MainContentArea"

import sessionService from "./services/sessions"

function App() {
  const [sessions, setSessions] = useState([])
  const [selectedSession, setSelectedSession] = useState(null)
  
  useEffect(() => {
    sessionService.getSessions().then((res) => {
      setSessions(res)
    })
  }, [])

  return (
    <div className="main-grid">
      <SiteHeader/>
      <LeftBar sessions={sessions} setSelectedSession={setSelectedSession}/>
      {selectedSession && <MainContentArea session={selectedSession}/>}
      
    </div>
  )
}

export default App
