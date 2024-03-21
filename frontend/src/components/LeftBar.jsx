import Search from './singles/Search'
import SessionsList from './SessionsList'

const LeftBar = ({sessions, searchSessions, currentSession, setCurrentSession}) => {
  return (
    <nav className="left-bar">
      <Search searchSessions={searchSessions}/>

      <SessionsList 
        sessions={sessions} 
        currentSession={currentSession} 
        setCurrentSession={setCurrentSession}
      />
    </nav>
  )
}



export default LeftBar