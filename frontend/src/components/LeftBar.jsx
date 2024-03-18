import Search from './singles/Search'
import SessionsList from './SessionsList'

const LeftBar = ({sessions, setSelectedSession, searchSessions, currentSession}) => {
  return (
    <nav className="left-bar">

      <Search searchSessions={searchSessions}/>

      <SessionsList sessions={sessions} currentSession={currentSession} setSelectedSession={setSelectedSession}/>

    </nav>
  )
}



export default LeftBar