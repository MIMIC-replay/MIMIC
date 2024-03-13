import Search from './Search'
import SessionsList from './SessionsList'

const LeftBar = ({sessions, setSelectedSession}) => {
  return (
    <nav className="left-bar">

      <Search/>

      <SessionsList sessions={sessions} setSelectedSession={setSelectedSession}/>

    </nav>
  )
}



export default LeftBar