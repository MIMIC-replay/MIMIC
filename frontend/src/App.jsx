import { useState, useEffect } from "react"

import {
  Link,
  Route, 
  Routes,
  useMatch
} from 'react-router-dom'



import SiteHeader from "./components/singles/SiteHeader"
import LeftBar from "./components/LeftBar"
import MainContentArea from "./components/MainContentArea"

import sessionService from "./services/sessions"

function App() {
  const [sessions, setSessions] = useState([])
  // const [currentSession, setCurrentSession] = useState(null)
  const [sessionsInList, setSessionsInList] = useState([])
  const [selectedSession, setSelectedSession] = useState(null)

  const match = useMatch('/sessions/:id')
  
  useEffect(() => {
    sessionService.getSessions().then((res) => {
      setSessions(res)
      setSessionsInList(res)
    })
  }, [])

  const currentSession = match
    ? sessions.find(session => session.id === Number(match.params.id))
    : null

  useEffect(() => {
    document.title = `M I M I C${currentSession ? ` #${currentSession.id}` : ''}`
  }, [currentSession])


  const searchSessions = (string) => {
    const filteredById = sessions.filter(s => String(s.id).includes(string))
    setSessionsInList(filteredById)
  }

  return (
    <div className="main-grid">
      <SiteHeader/>
      
      <LeftBar
        sessions={sessionsInList} 
        // setSelectedSession={setSelectedSession}
        searchSessions={searchSessions}
      />

      <Routes>
        <Route 
          path="/sessions/:id" 
          element={ 
            sessions.length > 0 && 
            currentSession && 
            <MainContentArea session={currentSession}/>
          }
        />
        <Route path="/" element={null}/>
      </Routes>

      {/* {selectedSession && <MainContentArea session={selectedSession}/>} */}
      
    </div>
  )
}

export default App
