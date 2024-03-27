import ExtraInfo from "./ExtraInfo"
import MainContentRightBar from "./MainContentRightBar"
import SessionContentHeader from './singles/SessionContentHeader'
import PlayerTest from "./PlayerTest"

const MainContentArea = ({session}) => {
  if (!session) return

  return (
    <section className="main-content-area">
      <SessionContentHeader session={session}/>
      <PlayerTest session={session}/>
      <ExtraInfo session={session}/>
      <MainContentRightBar session={session}/>
    </section>
  )
}




export default MainContentArea