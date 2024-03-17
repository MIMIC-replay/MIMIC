import { LineChart, Line } from 'recharts';

import {
  // BrowserRouter as Router,
  Link,
  // Route, 
  // Routes 
} from 'react-router-dom'

// const data = [
//   {uv: 10, pv: 400, amt: 400 },
//   {uv: 120, pv: 2520, amt: 1520 },
//   {uv: 440, pv: 2640, amt: 2640 },
//   {uv: 60, pv: 760, amt: 760 },
//   {uv: 80, pv: 2880, amt: 2880 },
//   {uv: 500, pv: 3000, amt: 3000 },
// ];

// const SessionElement = ({session, setSelectedSession}) => {
const SessionElement = ({session}) => {
  
  const data = session.events.map(e =>{
    return {...e.data}
  })
  
  // console.log(data)
  const renderLineChart = (
    <LineChart width={200} height={50} data={data}>
      <Line type="monotone" dataKey="latency" stroke="#8884d8" dot={false} />
    </LineChart>
  );

  return (
    <li className="session-list-element">
      <Link to={`/sessions/${session.id}`}>
        {`Session #${session.id}`}
        {renderLineChart}
        {`${session.metadata.date}`}
      </Link>
    </li>
  )
}

export default SessionElement