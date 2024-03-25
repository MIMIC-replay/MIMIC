import { errorTrigger, line, relativeTime } from "../../helpers/dataExtractors"

const Error = ({error, session, toggleErrorModal}) => {

  const time = relativeTime(error, session)
  const payload = error.data.payload.payload.join(', ')
  return (  
    <tr className="error" onClick={() => toggleErrorModal(error)}>
      <td> {time}</td>
      <td className="error-trigger">{`${errorTrigger(error)}`}</td>
      <td className="error-payload">
        {payload.length > 40 ? `${payload.slice(0, 40)}...` : payload }
      </td>
      <td className="error-line">{line(error)}</td>
    </tr>
  )
}

export default Error