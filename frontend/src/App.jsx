import { useState, useEffect } from "react"

import {
  Route, 
  Routes,
  useMatch,
  Navigate
} from 'react-router-dom'

import SiteHeader from "./components/singles/SiteHeader"
import LeftBar from "./components/LeftBar"
import MainContentArea from "./components/MainContentArea"
import Notification from "./components/singles/Notification"

import { short } from "./helpers/dataFormatters"

import sessionService from "./services/sessions"

function App() {
  const [sessions, setSessions] = useState([])
  const [sessionsInList, setSessionsInList] = useState([])
  const [notification, setNotification] = useState(null)

  const match = useMatch('/sessions/:id')
  
  useEffect(() => {
    sessionService.getSessions().then((res) => {
      setSessions(res)
      setSessionsInList(res)
    })
  }, [])

  const currentSession = match
  ? sessions.find(session => session.id.includes(match.params.id))
  // ? findSessionById(match.params.id)
  : null
  
  document.title = `M I M I C${currentSession ? ` #${short(currentSession.id)}` : ''}`

  // const findSessionById = (idInPath) => {
  //   return sessions.find(session => {
  //     return session.id.includes(idInPath)
  //   })
  // }

  const searchSessions = (string) => {
    const filteredById = sessions.filter(s => String(s.id).includes(string))
    setSessionsInList(filteredById)
  }

  const displayNotification = (notification, delay=4000) => {
    setNotification(notification)
    setTimeout(() => {
      setNotification(null)
    }, delay)
    return true
  }

  return (
    <div className="main-grid">
      <Notification notification={notification}/>
      <SiteHeader/>
      
      <LeftBar
        sessions={sessionsInList}
        currentSession={currentSession}
        searchSessions={searchSessions}
      />

      <Routes>
        <Route 
          path="/sessions/:id" 
          element={ 
            sessions.length > 0 && 
            <MainContentArea session={currentSession} displayNotification={displayNotification}/>
          }
        />
        <Route 
          path="/*"
          element={
          <Navigate to={'/'} replace/>
        }
        />
        <Route path="/" element={null}/>
      </Routes>      
    </div>
  )
}

export default App
