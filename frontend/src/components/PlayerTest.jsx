import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react"

import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';
// import '../style/unminified-rrplayer.css'

const PlayerTest = ({session}) => {
  const [player, setPlayer] = useState(null)

  useEffect(() => {
    if (session.events.length < 1) return

    (() => {

      let replayerDiv = document.getElementById("replayer")

      if (replayerDiv.firstChild) {
        replayerDiv.removeChild(replayerDiv.firstChild)
      }
  
      try {
        console.log('player activated')
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
      <PlayerControls player={player}/>    
    </div>
  )
}

const PlayerControls = ({player}) => {
  const [searchParams] = useSearchParams();

  const playerNavigate = async (player) => {
    let playerState

    player.addEventListener('ui-update-current-state', (event) => {
      playerState = event.payload
    })
    
    const seconds = searchParams.get('time')

    if (playerState === "paused") {
      player.play(); // prevents session replay from restarting from beginning if replay was at end
      player.goto(Math.floor(seconds * 1000));
      player.pause(); // returns to paused state for UX
    } else {
      player.goto(Math.floor(seconds * 1000));
    }
  }

  if (searchParams.get('time') && player) {
    playerNavigate(player)
  }

  return (
    <div className="player-controls">
      <button>Play</button>
      <button>Pause</button>
    </div>    
  )
}

export default PlayerTest