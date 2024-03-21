import { LineChart, Line } from 'recharts';

import { short } from '../../helpers/dataFormatters';

import {
  Link,
} from 'react-router-dom'

const SessionElement = ({session, currentSession, setCurrentSession}) => {

  const searchMode = document.querySelector('.search-input').value !== ''
  return (
    <Link 
      to={`/sessions/${short(session.id).toLowerCase()}`} 
      onClick={() => setCurrentSession(session)}
    >
      <li className={`session-list-element ${session?.id.includes(currentSession?.id) ? 'active' : ''}`}>
        {`Session #${searchMode ? session.id.toUpperCase() : short(session.id)}`}
        <MiniChart session={session}/>
        {`${session.metadata.date}`}
      </li>
    </Link>
  )
}

const MiniChart = ({session}) => {
  const data = session.events.filter(e => e.data.type !== 'WebSocket')
                             .map(e => { return {...e.data} })

  return (
    <LineChart width={200} height={50} data={data}>
      <Line type="monotone" dataKey="latency" stroke="#8884d8" dot={false}/>
    </LineChart>
  );
}

export default SessionElement