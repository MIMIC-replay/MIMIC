import { useState, useEffect } from "react"

import SiteHeader from "./components/SiteHeader"
import LeftBar from "./components/LeftBar"
import MainContentArea from "./components/MainContentArea"

import sessionService from "./services/sessions"

function App() {
  const [sessions, setSessions] = useState([])
  const [sessionsInList, setSessionsInList] = useState([])
  const [selectedSession, setSelectedSession] = useState(null)
  
  useEffect(() => {
    sessionService.getSessions().then((res) => {
      setSessions(res)
      setSessionsInList(res)
    })
  }, [])

  const searchSessions = (string) => {
    const filteredById = sessions.filter(s => String(s.id).includes(string))
    setSessionsInList(filteredById)
  }

  return (
    <div className="main-grid">
      <SiteHeader/>
      
      <LeftBar
        sessions={sessionsInList} 
        setSelectedSession={setSelectedSession}
        searchSessions={searchSessions}
      />

      {selectedSession && <MainContentArea session={selectedSession}/>}
      
    </div>
  )
}

export default App
