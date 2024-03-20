import SessionElement from "./singles/SessionElement"

const SessionsList = ({sessions, currentSession, setCurrentSession}) => {
  return (
    <div className="sessions-container">

      <ul className="sessions-list">
        {sessions.map(s => 
          <SessionElement 
            key={s.id} 
            session={s}
            currentSession={currentSession}
            setCurrentSession={setCurrentSession}
          />
        )}
      </ul>

    </div>
  )
}

export default SessionsList