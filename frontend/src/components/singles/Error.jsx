import { errorTrigger, line, relativeTime } from "../../helpers/dataExtractors"

const Error = ({error, session, toggleErrorModal}) => {

  const time = relativeTime(error, session)
  
  return (  
    <li className='error' onClick={() => toggleErrorModal(error)}>
      <p>{time}</p>
      <p className="error-trigger">{`${errorTrigger(error)}`}</p>
      <p className="error-line">{`Line: ${line(error)}`}</p>
    </li>
  )
}

export default Error