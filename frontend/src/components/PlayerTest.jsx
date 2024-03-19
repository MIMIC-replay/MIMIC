import { useEffect } from "react"

import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';
// import '../style/unminified-rrplayer.css'

const PlayerTest = ({session}) => {

  // return null
  // console.log(session)
  useEffect(() => {
    if (session.events.length < 1) return 
    loadSessionPlayer()
  })

  const loadSessionPlayer = async () => {
    let replayerDiv = document.getElementById("replayer")

    if (replayerDiv.firstChild) {
      replayerDiv.removeChild(replayerDiv.firstChild)
    }

    try {
      new rrwebPlayer({
        target: document.getElementById("replayer"),
        props: {
          events: session.events,
          // showController: false,
          width: 600,
          height: 270,
          autoPlay: true,
        },
      })

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div id="replayer"></div>    
  )
}

export default PlayerTest