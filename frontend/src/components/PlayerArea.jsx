import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import rrwebPlayer from 'rrweb-player'
import 'rrweb-player/dist/style.css'

const PlayerArea = ({session}) => {
  const [player, setPlayer] = useState(null)
  const [events, setEvents] = useState(() => session.events)

  const loadSessionPlayer = useCallback(() => {
    let replayerDiv = document.querySelector("#replayer")
    
    if (replayerDiv?.firstChild) {
      console.log('player killed')
      replayerDiv.removeChild(replayerDiv.firstChild)
    }


    try {
      setPlayer(() => {
        console.log('new player created')
        return new rrwebPlayer({
          target: document.getElementById("replayer"),
          props: {
            events: session.events,
            width: 600,
            height: 270,
          },
      })})

      return player
    } catch (error) {
      console.log(error)
    }
  }, [events, player, session])

  
  useEffect(() => {
    if (session.events.length < 1 || player) return 

    loadSessionPlayer()
  }, [player, events, loadSessionPlayer])
  


  return (
    <div className={`player-area ${session?.id}`}>
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
    <div className='player-controls'>
      <button
        onClick={() => player.play()}
        >PLAY</button>
      <button
        onClick={() => player.pause()}
      >PAUSE</button>

    </div>
  )
}

export default PlayerArea