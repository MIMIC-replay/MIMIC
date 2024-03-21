import { eventAnalyzer, relativeTime } from "../../helpers/dataExtractors"

const RightBarEventListElement = ({event, session}) =>{

  const {
    numberType,
    decodedType,
    isUserInteraction,
    interactionSource,
    isMouseInteraction,
    mouseInteraction,
  } = eventAnalyzer(event)

  const time = relativeTime(event, session)
  return (
    <li className="right-bar-event-element">
      <div>
        <p>{time}</p>
        <p>{decodedType}</p>
      </div>
    </li>
  )  
}

export default RightBarEventListElement