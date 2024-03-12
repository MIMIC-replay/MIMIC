import Search from './Search'
import SessionsList from './SessionsList'

const LeftBar = ({sessions}) => {
  return (
    <nav className="left-bar">

      <Search/>

      <SessionsList sessions={sessions}/>

    </nav>
  )
}



export default LeftBar