import { errorTrigger, line, relativeTime } from "../../helpers/dataExtractors"

import { isLoaded } from "../../helpers/dataFormatters"

const Error = ({error, session, toggleErrorModal}) => {

  const time = relativeTime(error, session)
  const payload = error.data.payload.payload.join(', ')
  return (  
    <tr className="error" onClick={() => toggleErrorModal(error)}>   
        <td>{isLoaded(time, session) ? time : ''}</td>
        <td className="error-trigger">{`${errorTrigger(error)}`}</td>
        <td className="error-payload">
          {payload.length > 80 ? `${payload.slice(0, 80)}...` : payload }
        </td>
        <td className="error-line">{line(error)}</td>
    </tr>
  )
}

export default Error