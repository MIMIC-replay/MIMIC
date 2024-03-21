import { errorTrigger, line, relativeTime } from "../../helpers/dataExtractors"

const Error = ({error, session, toggleErrorModal}) => {

  const time = relativeTime(error, session)

  return (  
    <tr className="error" onClick={() => toggleErrorModal(error)}>
      <td> {time}</td>
      <td className="error-trigger">{`${errorTrigger(error)}`}</td>
      <td className="error-line">{line(error)}</td>
    </tr>
  )
}

export default Error