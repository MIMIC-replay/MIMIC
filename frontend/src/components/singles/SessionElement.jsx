import { LineChart, Line } from 'recharts';

import {
  // BrowserRouter as Router,
  Link,
  // Route, 
  // Routes 
} from 'react-router-dom'


// const SessionElement = ({session, setSelectedSession}) => {
const SessionElement = ({session, currentSession}) => {
  
  const data = session.events.map(e =>{
    return {...e.data}
  })

  const renderLineChart = (
    <LineChart width={200} height={50} data={data}>
      <Line type="monotone" dataKey="latency" stroke="#8884d8" dot={false} />
    </LineChart>
  );

  return (
    <Link to={`/sessions/${session.id}`}>
      <li className={`session-list-element ${currentSession?.id === session.id ? 'active' : ''}`}>
        {`Session #${session.id}`}
        {renderLineChart}
        {`${session.metadata.date}`}
      </li>
    </Link>
  )
}

export default SessionElement