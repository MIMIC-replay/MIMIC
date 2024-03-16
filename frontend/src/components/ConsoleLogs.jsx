import Log from './singles/Log'

const ConsoleLogs = ({logs, session}) => {
  console.log(logs)
  return (
    <ul>
      {logs.map((l, i) => <Log key={i} log={l} session={session}/>)}
    </ul>
  )
}

export default ConsoleLogs