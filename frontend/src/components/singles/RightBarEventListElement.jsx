import { eventAnalyzer, relativeTime } from "../../helpers/dataExtractors"
import MouseIcon from "../iconComponents/mouse"
import NetworkIcon from "../iconComponents/network"

const RightBarEventListElement = ({event, session}) =>{
  
  // {
  //   numberType,
  //   decodedType,
  //   isUserInteraction,
  //   source,
  //   isMouseInteraction,
  //   mouseInteraction,
  // } = eventAnalyzer(event)

  const eventData = eventAnalyzer(event)

  const time = relativeTime(event, session)
  return (
    <li className="right-bar-event-element">
      <div>
        <p>{time}</p>
        <EventTypeIcon eventData={eventData}/>
        <p>{eventData.source.includes('Mouse') ? 'MouseInteraction' : eventData.decodedType}</p>
      </div>
    </li>
  )  
}

const EventTypeIcon = ({eventData}) => {
  if (eventData.source.includes('Mouse')) {
    return <MouseIcon/>
  } else if (eventData.decodedType.includes('Network')) {
    return <NetworkIcon/>
  } else if (eventData.decodedType === 'Meta') {
    return <MouseIcon/>
  }
}

export default RightBarEventListElement