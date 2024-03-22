import { LineChart, Line } from 'recharts';

import { short } from '../../helpers/dataFormatters';

import {
  Link,
} from 'react-router-dom'

const SessionElement = ({session, currentSession, setCurrentSession}) => {

  const searchMode = document.querySelector('.search-input').value !== ''

  const date = session.metadata.date.match(/^(.+)T/)[1]
  const exactTime = session.metadata.date.match(/T(.{8})/)[1]

  return (
    <Link 
      to={`/sessions/${short(session.id).toLowerCase()}`} 
      onClick={() => setCurrentSession(session)}
    >
      <li className={`session-list-element ${session?.id.includes(currentSession?.id) ? 'active' : ''}`}>
        <p>{`Session #${searchMode ? session.id.toUpperCase() : short(session.id)}`}</p>
        <MiniChart session={session}/>
        <p>{`${date} at ${exactTime}`}</p>
      </li>
      
    </Link>
  )
}

const MiniChart = ({session}) => {
  const data = session.events.filter(e => e.data.type !== 'WebSocket' && e.data.latency )
                             .map(e => { return {...e.data} })

  return (
    <LineChart width={200} height={50} data={data}>
      <Line type="monotone" dataKey="latency" stroke="#8884d8" dot={false}/>
    </LineChart>
  );
}

export default SessionElement