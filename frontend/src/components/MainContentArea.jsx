import {
  Navigate,
} from 'react-router-dom'


import ExtraInfo from "./ExtraInfo"

import PlayerTest from "./PlayerTest"

import MainContentRightBar from "./MainContentRightBar"
import SessionContentHeader from './singles/SessionContentHeader'

const MainContentArea = ({session, displayNotification}) => {
  // const match = useMatch('/sessions/:id')
  // if (!session) return <Navigate to={'/'} replace />

  // if (!session && match) {
  //   displayNotification({ type: 'fail', message: 'Invalid Id' })

  //   return (
  //     <Navigate to={'/'} replace />
  //   )
  // }
  
  if (!session) return
  
  return (
    <section className="main-content-area">
      <SessionContentHeader session={session}/>

      {/* 
      
      
        <div className="player">Player <div className="screen">Screen</div></div>

        <div className="player-controls">

          <div className="controls">
            <span>⏪⏯⏩</span>
              <span className="right-controls">📶🔁</span>
          </div>

        </div> 
      
      
      */}
        
      <PlayerTest session={session}/>

      <ExtraInfo session={session}/>

      <MainContentRightBar session={session}/>
  </section>
  )
}




export default MainContentArea