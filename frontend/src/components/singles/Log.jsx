import { relativeTime } from "../../helpers/dataExtractors"

const Log = ({log, session}) => {

  const time = relativeTime(log, session)
  const content = log.data.payload.payload.join()
  
  return (
      <tr className="log">
        <td className="log-time">{time}</td>
        <td className="log-type">{log.type}</td>
        <td className="log-content">{content}</td>
      </tr>
  )
}

export default Log