import SessionElement from "./SessionElement"

const SessionsList = ({sessions, setSelectedSession}) => {
  return (
    <div className="sessions-container">

      <ul className="sessions-list">
        {sessions.map(s => 
          <SessionElement 
            key={s.metadata.sessionId} 
            session={s} 
            setSelectedSession={setSelectedSession}
          />
        )}
      </ul>

    </div>
  )
}



export default SessionsList