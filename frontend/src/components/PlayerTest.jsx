import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"

import rrwebPlayer from 'rrweb-player'
// import 'rrweb-player/dist/style.css'
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
        const newPlayer = 
          new rrwebPlayer({
            target: document.getElementById("replayer"),
            props: {
              events: session.events,
              // showController: false,
              width: 800,
              height: 304,
              // autoPlay: true,
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

  return (
      <div id="replayer"></div>
  )
}

const PlayerControls = ({player}) => {
  const [searchParams] = useSearchParams()
  const [playing, setPlaying] = useState(false)
  const [currentSpeed, setCurrentSpeed] = useState('2')

  const playerNavigate = (player) => {
    let playerState

    player.addEventListener('ui-update-current-state', (event) => {
      playerState = event.payload
    })
    
    const seconds = searchParams.get('time')

    if (playerState === 'paused') {
      player.play(); // prevents session replay from restarting from beginning if replay was at end
      player.goto(Math.floor(seconds * 1000));
      player.pause(); // returns to paused state for UX
    } else {
      player.goto(Math.floor(seconds * 1000));
    }
  }

  if (searchParams.get('time') && player) {
    // setPlaying(true)
    playerNavigate(player)
  }

  // const play = () => {
  //   if (playing) return

  //   player.play()
  //   setPlaying(true)
  // }

  const pause = () => {
    player.pause()
    setPlaying(false)
  }

  const isPlaying = () => {
    if (!player) return
    let playerState

    player.addEventListener('ui-update-current-state', (event) => {
      playerState = event.payload
      console.log(playerState)
    })

    return playerState
  }

  const [isChecked, setIsChecked] = useState(true);

  const handleToggle = () => {
    player.toggleSkipInactive()
    setIsChecked(!isChecked);
  };

  return (
    <div className="player-controls">
      <button
        onClick={() => player.toggle()}
      >
      {isPlaying() === 'paused' ? `not playing` : 'playing'}
      </button>

      {/* <button
        onClick={() => {
          player.$set({width: window.screen.width, height: window.screen.height})
          player.triggerResize()
          document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
              player.$set({width: 600, height: 275})
              player.triggerResize()
            }
          });
        }
        }
      >
        💻
      </button> */}
      <button
        onClick={() => player.setSpeed(2)}
      >
        {}
      </button>
      <button
        onClick={() => player.setSpeed(2)}
      >
      5
      </button>
      <button
        onClick={() => player.setSpeed(4)}
      >
        4x
      </button>
      <button
        onClick={() => player.setSpeed(8)}
      >
        8x
      </button>
      <label className="toggle-button">
        <input type="checkbox" checked={isChecked} onChange={handleToggle} />
        <span className="slider"></span>
      </label>
    </div>    
  )
}

export default PlayerTest