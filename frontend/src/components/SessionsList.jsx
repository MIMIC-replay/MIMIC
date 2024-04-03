import SessionElement from "./singles/SessionElement"

const SessionsList = ({sessions, currentSession, setCurrentSession, searchMode}) => {
  if (!sessions) return

  const changeSession = (session) => {
    setCurrentSession(session)
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