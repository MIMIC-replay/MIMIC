import Log from './singles/Log'

const ConsoleLogs = ({logs, session}) => {

  return (
    <table className="console-logs">
      <thead>
        <tr>
          <th className='console-logs-time-header'>Time</th>
          <th className='console-logs-type-header'>Type</th>
          <th>Content</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((l, i) => <Log key={i} log={l} session={session}/>)}
      </tbody>
    </table>
  )
}

export default ConsoleLogs