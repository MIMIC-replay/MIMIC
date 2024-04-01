import Search from './singles/Search'
import SessionsList from './SessionsList'

const LeftBar = ({sessions, searchSessions, resetSessions, currentSession, setCurrentSession, searchSessionsWithErrors}) => {
  return (
    <nav className="left-bar">
      <Search 
        searchSessions={searchSessions}
        searchSessionsWithErrors={searchSessionsWithErrors}
        resetSessions={resetSessions}
      />

      <SessionsList 
        sessions={sessions} 
        currentSession={currentSession} 
        setCurrentSession={setCurrentSession}
      />
    </nav>
  )
}



export default LeftBar