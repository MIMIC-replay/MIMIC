import SessionElement from "./singles/SessionElement"

const SessionsList = ({sessions, currentSession}) => {
  return (
    <div className="sessions-container">

      <ul className="sessions-list">
        {sessions.map(s => 
          <SessionElement 
            key={s.id} 
            session={s}
            currentSession={currentSession}
          />
        )}
      </ul>

    </div>
  )
}



export default SessionsList