const SessionsList = ({sessions}) => {
  return (
    <div className="sessions-container">

      <ul className="sessions-list">
        {sessions.map(s => <Session key={s.metadata.id} session={s}/>)}
      </ul>

    </div>
  )
}

const Session = ({session}) => {
  console.log(session)
  return (
    <li>{`Session #${session.metadata.id}`}</li>
  )
}

export default SessionsList