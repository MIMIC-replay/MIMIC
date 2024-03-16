import { errorTrigger, line, relativeTime } from "../../helpers/dataExtractors"
import {epochToDate} from '../../helpers/dateFormatters'

const Error = ({error, session}) => {
  // const {content, line, payload} = error
  // const data = error.data
  const time = relativeTime(error, session)
  return (  
    <li className='error'>
      <p>{time}</p>
      <p className="error-trigger">{`${errorTrigger(error)}`}</p>
      <p className="error-line">{`Line: ${line(error)}`}</p>
    </li>
  )
}

export default Error