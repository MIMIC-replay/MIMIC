import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"

import rrwebPlayer from 'rrweb-player'

const PlayerArea = ({session}) => {
  const [player, setPlayer] = useState(null)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    if (session.events.length < 1) return

    (() => {

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
              width: 1245,
              height: 304,
              // autoPlay: true,
            },
          })
        
        setPlayer(newPlayer)
        // return newPlayer
      } catch (error) {
        console.log(error)
      }

    })() 
  }, [session])

  const playerNavigate = () => {
    const goToSeconds = searchParams.get('time')

    if (!goToSeconds || !player) return

    player.play(); // prevents session replay from restarting from beginning if replay was at end
    player.goto(Math.floor(goToSeconds * 1000));
    player.pause(); // returns to paused state for UX
  }

  playerNavigate()

  return (
      <div id="replayer"></div>
  )
}

export default PlayerArea