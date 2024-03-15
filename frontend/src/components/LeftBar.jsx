import Search from './Search'
import SessionsList from './SessionsList'

const LeftBar = ({sessions, setSelectedSession, searchSessions}) => {
  return (
    <nav className="left-bar">

      <Search searchSessions={searchSessions}/>

      <SessionsList sessions={sessions} setSelectedSession={setSelectedSession}/>

    </nav>
  )
}



export default LeftBar