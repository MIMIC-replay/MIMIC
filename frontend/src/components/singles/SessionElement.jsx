import { LineChart, Line } from 'recharts';

import { short } from '../../helpers/dataFormatters';

import { 
  Link,
} from 'react-router-dom'


const SessionElement = ({session, currentSession}) => {
  
  const data = session.events.map(e =>{
    return {...e.data}
  })

  const renderLineChart = (
    <LineChart width={200} height={50} data={data}>
      <Line type="monotone" dataKey="latency" stroke="#8884d8" dot={false} />
    </LineChart>
  );
  console.log(session)
  console.log(currentSession)

  return (
    <Link to={`/sessions/${short(session.id)}`}>
      <li className={`session-list-element ${session?.id.includes(currentSession?.id) ? 'active' : ''}`}>
        {`Session #${short(session.id)}`}
        {renderLineChart}
        {`${session.metadata.date}`}
      </li>
    </Link>
  )
}

export default SessionElement