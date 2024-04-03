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
              width: 1245,
              height: 304,
              // autoPlay: true,
              inactiveColor: ``,
              mouseTail: {
                strokeStyle: '#ff842d'
              }
            },
          })
        
        setPlayer(newPlayer)
      } catch (error) {
        console.log(error)
      }

    })() 
  }, [session])

  const playerNavigate = async () => {
    const goToSeconds = searchParams.get('time')

    if (!goToSeconds || !player) return

    player.goto(Math.floor(goToSeconds * 1000));

    let getCurrentState
    player.addEventListener('ui-update-player-state', (event) => {
      getCurrentState = () => event.payload;
    });
    
    if (getCurrentState && getCurrentState() !== 'playing') player.pause();
  }

  playerNavigate()

  return (
      <div id="replayer"></div>
  )
}

export default PlayerArea