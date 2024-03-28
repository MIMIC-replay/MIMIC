import ExtraInfo from "./ExtraInfo"
import MainContentRightBar from "./MainContentRightBar"
import SessionContentHeader from './singles/SessionContentHeader'
import PlayerArea from "./PlayerArea"

const MainContentArea = ({session}) => {
  if (!session) return

  return (
    <section className="main-content-area">
      <SessionContentHeader session={session}/>
      <PlayerArea session={session}/>
      <ExtraInfo session={session}/>
      <MainContentRightBar session={session}/>
    </section>
  )
}




export default MainContentArea