import SessionElement from "./singles/SessionElement"

const SessionsList = ({sessions, currentSession, setCurrentSession, searchMode}) => {

  const changeSession = (session) => {
    // if (session === currentSession) return
    
    // killPlayer()
    setCurrentSession(session)
  }

  const killPlayer = () => {
    const player = document.querySelector('#replayer')
    if (!player) return


    if (player?.firstChild) {
      console.log('player killed')
      player.removeChild(player.firstChild)
    }
  }

  return (
    <div className="sessions-container">
      <ul className="sessions-list">
        {sessions.map(s => 
          <SessionElement 
            key={s.id} 
            session={s}
            currentSession={currentSession}
            setCurrentSession={changeSession}
            searchMode={searchMode}
          />
        )}
      </ul>
    </div>
  )
}

export default SessionsList