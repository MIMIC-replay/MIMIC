import { useEffect, useState } from "react"

import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';
// import '../style/unminified-rrplayer.css'

const PlayerTest = ({session}) => {
  const [player, setPlayer] = useState(null)

  useEffect(() => {
    if (session.events.length < 1) return

    (async () => {

      let replayerDiv = document.getElementById("replayer")

      if (replayerDiv.firstChild) {
        replayerDiv.removeChild(replayerDiv.firstChild)
      }
  
      try {
        const newPlayer = 
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
        
        setPlayer(newPlayer)
        // return newPlayer
      } catch (error) {
        console.log(error)
      }

      // const newPlayer = await loadSessionPlayer()
    })() 
  }, [session])

  // const loadSessionPlayer = async () => {
  //   let replayerDiv = document.getElementById("replayer")

  //   if (replayerDiv.firstChild) {
  //     replayerDiv.removeChild(replayerDiv.firstChild)
  //   }

  //   try {
  //     const newPlayer = 
  //       new rrwebPlayer({
  //         target: document.getElementById("replayer"),
  //         props: {
  //           events: session.events,
  //           // showController: false,
  //           width: 600,
  //           height: 270,
  //           autoPlay: true,
  //         },
  //       })
      
  //     return newPlayer

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <div className="player-area"> 
      <div id="replayer"></div>    
      <div className="player-controls"></div>    
    </div>
  )
}

export default PlayerTest