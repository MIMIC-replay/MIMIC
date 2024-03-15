import { relativeTime } from "../../helpers/dataExtractors"

const RightBarEventListElement = ({event, session}) =>{

  const time = relativeTime(event, session)
  return (
    <li>
      {`Time: ${time} - Type: ${event.type}`}
    </li>
  )  
}

export default RightBarEventListElement