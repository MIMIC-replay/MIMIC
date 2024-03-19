import Log from './singles/Log'

const ConsoleLogs = ({logs, session}) => {
  return (
    <ul>
      {logs.map((l, i) => <Log key={i} log={l} session={session}/>)}
    </ul>
  )
}

export default ConsoleLogs