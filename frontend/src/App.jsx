import { useState, useEffect, useCallback } from "react"

import {
  Route, 
  Routes,
  useMatch,
  Navigate,
  useNavigate
} from 'react-router-dom'

import SiteHeader from "./components/singles/SiteHeader"
import LeftBar from "./components/LeftBar"
import MainContentArea from "./components/MainContentArea"
import Notification from "./components/singles/Notification"

import { shorten } from "./helpers/dataFormatters"

import { getSessions, setToken } from "./services/sessions"
import LoginForm from "./components/login/LoginForm"

import { login } from "./services/login"

import { isExpired } from "react-jwt";

function App() {
  const [sessions, setSessions] = useState([])
  const [sessionsInList, setSessionsInList] = useState([])
  const [notification, setNotification] = useState(null)
  const [project, setProject] = useState(() => {
    const storedProject = window.localStorage.getItem('loggedMimicProject')
    if (storedProject) {
      const project = JSON.parse(storedProject)
      setToken(project.token)
      return project
    }
  })

  const match = useMatch('/sessions/:id')

  const navigate = useNavigate()

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

    const session = findSessionById(match.params.id)

    if (!session) {
      displayNotification({type: 'fail', message: 'Invalid session id'})
      navigate('/')
      return
    }
    
    setCurrentSession(findSessionById(match.params.id))
  }, [sessions, findSessionById, match, navigate])
  
  
  useEffect(() => {
    const storedProject = window.localStorage.getItem('loggedMimicProject')
    const expired = isExpired(storedProject)
    
    if (expired) {
      handleLogout()
      return
    }

    if (storedProject && !expired) {
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
        console.error(exception)
      }
    }
    
    const handleLogout = () => {
      setCurrentSession(null)
      setProject(null)
      window.localStorage.clear()
    }
   
    const searchSessions = (string) => {
      const filteredById = sessions.filter(s => {
        return s.id.toLowerCase().includes(string.toLowerCase()) ||
          s.metadata.ip.includes(string)
      })
      setSessionsInList(filteredById)
    }

    const searchSessionsWithErrors = () => {
      const sessionsWithErrors = sessions.filter(s => hasErrors(s))
      setSessionsInList(sessionsWithErrors)
    }

    const hasErrors = (session) => {
      return session.errors.length > 0 ||
        session.network.some(event => event.data?.status && event.data.status >= 400)
    }

    const resetSessions = () => {
      setSessionsInList(sessions)
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
        searchSessionsWithErrors={searchSessionsWithErrors}
        resetSessions={resetSessions}
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

  document.title = 
  `M I M I C ${project ? `: ${shorten(project.id)}` : ''}${currentSession ? ` #${shorten(currentSession.id)}` : ''}`
  
  return (
    project ? loggedProjectUI() : loginForm()
    )
  }
  
  export default App
  