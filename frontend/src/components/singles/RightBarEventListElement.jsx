import { Link, useLocation } from "react-router-dom"

import { eventAnalyzer, mouseEventType, relativeSeconds, relativeTime } from "../../helpers/dataExtractors"
import MouseIcon from "../iconComponents/mouse"
import NetworkIcon from "../iconComponents/network"
import MetaIcon from "../iconComponents/meta"
import FullSnapshotIcon from "../iconComponents/fullSnapshot"
import UserIcon from "../iconComponents/user"
import LoadIcon from "../iconComponents/load"
import CustomIcon from "../iconComponents/custom"
import PluginIcon from "../iconComponents/plugin"

import { isLoaded } from "../../helpers/dataFormatters"

const RightBarEventListElement = ({event, session}) =>{
  const location = useLocation()

  const eventData = eventAnalyzer(event)

  const time = relativeTime(event, session)
  let type
  if (eventData.source.includes('Mouse')) type = mouseEventType(eventData)
  else if (eventData.decodedType === 'IncrementalSnapshot') type = eventData.source
  else type = eventData.decodedType

  return (
    <li className="right-bar-event-element">
      <Link
        to={`${location.pathname}?time=${Math.floor(relativeSeconds(event, session))}`}
      >
        <div>
          <p>{isLoaded(time, session) ? time : ''}</p>
          <EventTypeIcon eventData={eventData}/>
          <p>{type}</p>
        </div>

      </Link>
    </li>
  )  
}


const EventTypeIcon = ({eventData}) => {
  if (eventData.source.includes('Mouse')) {
    return <MouseIcon/>
  } else if (eventData.decodedType.includes('Network')) {
    return <NetworkIcon/>
  } else if (eventData.decodedType === 'Meta') {
    return <MetaIcon/>
  } else if (eventData.decodedType === 'FullSnapshot') {
    return <FullSnapshotIcon/>
  } else if (eventData.decodedType === 'Load') {
    return <LoadIcon/>
  } else if (eventData.decodedType === 'Custom') {
    return <CustomIcon/>
  } else if (eventData.decodedType === 'Plugin') {
    return <PluginIcon/>
  } else {
    return <UserIcon/>
  }
}

export default RightBarEventListElement