import { errorTrigger, line } from "../../helpers/dataExtractors"

const Error = ({error, session}) => {
  // const {content, line, payload} = error
  // const data = error.data

  return (
    <li className='error'>
      <p>{`${error.timestamp}`}</p>
      <p className="error-trigger">{`${errorTrigger(error)}`}</p>
      <p className="error-line">{`Line: ${line(error)}`}</p>
    </li>
  )
}

export default Error