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

import { isExpired, decodeToken } from "react-jwt";

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
      setSessions(res.reverse())
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
    let parsedProject
    let token
    	try {
		parsedProject = storedProject && JSON.parse(storedProject)
		token = parsedProject ? decodeToken(parsedProject?.token) : null 
	} catch (e) {
		handleLogout()
		return
	}
    const isValidToken = token?.id === parsedProject?.id && 
		  token?.name === parsedProject?.name 
    const expired = isExpired(storedProject)
    
    if (!isValidToken || expired) {
	handleLogout()
      return
    }

    if (storedProject && !expired) {
      const project = parsedProject
      setProject(project)
      setToken(project.token)
    }
  }, [])
  
  
  const loginUser = async (projectName, password) => {
    try {
      const project = await login({ projectName, password })

      if (!project) {
        displayNotification({ type: 'fail', message: 'Wrong credentials' })
        return
      }

      window.localStorage.setItem(
        'loggedMimicProject', JSON.stringify(project)
      )
        
        setToken(project.token)
        setProject(project)
        displayNotification({type: 'success', message: 'Welcome to MIMIC'})
        return true
      } catch (e) {
        console.error(e.message)
      }
    }
    
    const handleLogout = () => {
      setCurrentSession(null)
      setProject(null)
      window.localStorage.clear()
    }
   
    const searchSessions = (string) => {
      const errorMode = document.querySelector('.only-error-sessions.active')
      const baseSessions = errorMode ? sessions.filter(s => hasErrors(s)) : sessions
      const filteredById = baseSessions.filter(s => {
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
    
    const displayNotification = (notification, delay=5000) => {
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
    return (
      <>
        <Notification notification={notification}/>
        <LoginForm loginUser={loginUser}/>
      </>
    )
  }

  document.title = 
    `M I M I C ${project ? `:: ${shorten(project.id)}` : ''}${currentSession 
      ? ` #${shorten(currentSession.id)}` :
       ''}`
  
  return (
    project ? loggedProjectUI() : loginForm()
    )
  }
  
  export default App
  
