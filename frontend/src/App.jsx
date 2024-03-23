import { useState, useEffect, useCallback } from "react"

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

import { shorten } from "./helpers/dataFormatters"

import { getSessions, setToken } from "./services/sessions"
import LoginForm from "./components/login/LoginForm"

import { login } from "./services/login"

function App() {
  const [sessions, setSessions] = useState([])
  const [sessionsInList, setSessionsInList] = useState([])
  const [notification, setNotification] = useState(null)

  // TEST:
  const [project, setProject] = useState({id: 1234123, name: 'super_project'})

  // const [project, setProject] = useState(null)

  const match = useMatch('/sessions/:id')

  useEffect(() => {
    if (!project) return 

    getSessions(project.id).then((res) => {
      setSessions(res)
      setSessionsInList(res)
    })
  }, [project])

  
  const findSessionById = useCallback((id) => {
    return sessions.find(session => session.id.includes(id))
  }, [sessions])
  
  const [currentSession, setCurrentSession] = useState(() => {
      return match
      ? findSessionById(match.params.id)
      : null
    }
  )
  
  useEffect(() => {
    if (sessions.length < 1 || !match) return
    
    setCurrentSession(findSessionById(match.params.id))
  }, [sessions, findSessionById, match])
  
  
  useEffect(() => {
    const storedProject = window.localStorage.getItem('loggedMimicProject')

    if (storedProject) {
      const project = JSON.parse(storedProject)
      setProject(project)
      setToken(project.token)
    }
  }, [])
  
  
  const loginUser = async (projectName, password) => {
    try {
      const project = await login({ projectName, password })
      
      window.localStorage.setItem(
        'loggedMimicProject', JSON.stringify(project)
      )
        
        setToken(project.token)
        setProject(project)
        return true
      } catch (exception) {
        displayNotification({ type: 'fail', message: 'Wrong credentials' })
      }
    }
    
    const handleLogout = () => {
      setCurrentSession(null)
      setProject(null)
      window.localStorage.clear()
    }
        
    document.title = 
      `M I M I C ${project ? `: ${project.id}` : ''}${currentSession ? ` #${shorten(currentSession.id)}` : ''}`
    
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
    
    const loggedProjectUI = () => {
      return (
        <div className="main-grid">
      <Notification notification={notification}/>
      <SiteHeader handleLogout={handleLogout} project={project}/>
      
      <LeftBar
        sessions={sessionsInList}
        currentSession={currentSession}
        setCurrentSession={setCurrentSession}
        searchSessions={searchSessions}
      />

      <Routes>
        <Route 
          path="/sessions/:id" 
          element={
            <MainContentArea 
            session={currentSession}
            displayNotification={displayNotification}
            />
          }
        />

        <Route 
          path="/*"
          element={
            <Navigate to={'/'} replace/>
          }
        />
      </Routes> 
    </div>
    )
  }
  
  const loginForm = () => {
    return <LoginForm loginUser={loginUser}/>
  }
  
  return (
    project ? loggedProjectUI() : loginForm()
    )
  }
  
  export default App
  