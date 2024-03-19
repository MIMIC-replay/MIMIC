import Search from './singles/Search'
import SessionsList from './SessionsList'

const LeftBar = ({sessions, searchSessions, currentSession}) => {
  return (
    <nav className="left-bar">

      <Search searchSessions={searchSessions}/>

      <SessionsList sessions={sessions} currentSession={currentSession}/>
    </nav>
  )
}



export default LeftBar