import Session from "./Session"

const SessionsList = ({sessions}) => {
  return (
    <div className="sessions-container">

      <ul className="sessions-list">
        {sessions.map(s => <Session key={s.metadata.id} session={s}/>)}
      </ul>

    </div>
  )
}



export default SessionsList