import { errorTrigger, line, relativeTime } from "../../helpers/dataExtractors"

import { Link } from "react-router-dom"

const Error = ({error, session, toggleErrorModal}) => {

  const time = relativeTime(error, session)
  const payload = error.data.payload.payload.join(', ')
  return (  
    <tr className="error" onClick={() => toggleErrorModal(error)}>   
        <td> {time}</td>
        <td className="error-trigger">{`${errorTrigger(error)}`}</td>
        <td className="error-payload">
          {payload.length > 70 ? `${payload.slice(0, 70)}...` : payload }
        </td>
        <td className="error-line">{line(error)}</td>
    </tr>
  )
}

export default Error