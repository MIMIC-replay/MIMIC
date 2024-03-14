import SessionElement from "./singles/SessionElement"

const SessionsList = ({sessions, setSelectedSession}) => {
  return (
    <div className="sessions-container">

      <ul className="sessions-list">
        {sessions.map(s => 
          <SessionElement 
            key={s.id} 
            session={s} 
            setSelectedSession={setSelectedSession}
          />
        )}
      </ul>

    </div>
  )
}



export default SessionsList