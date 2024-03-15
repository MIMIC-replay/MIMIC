import { LineChart, Line } from 'recharts';

const data = [
  {uv: 10, pv: 400, amt: 400 },
  {uv: 120, pv: 2520, amt: 1520 },
  {uv: 440, pv: 2640, amt: 2640 },
  {uv: 60, pv: 760, amt: 760 },
  {uv: 80, pv: 2880, amt: 2880 },
  {uv: 500, pv: 3000, amt: 3000 },
];

const SessionElement = ({session, setSelectedSession}) => {
  const renderLineChart = (
    <LineChart width={200} height={50} data={data}>
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    </LineChart>
  );

  return (
    <li className="session-list-element" onClick={() => setSelectedSession(session)}>
      {`Session #${session.metadata.sessionId}`}
      {renderLineChart}
      {`${session.metadata.time.toISOString().split('T')}`}
    </li>
  )
}

export default SessionElement