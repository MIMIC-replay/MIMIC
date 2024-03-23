

import RightBarEventListElement from './singles/RightBarEventListElement'
import Map from "./singles/Map"
import SessionMetadataTable from "./singles/SessionMetadataTable"

import { shorten } from "../helpers/dataFormatters"

const MainContentRightBar = ({session}) => {

  return (
    <div className="main-right-bar">

      <div className="main-right-bar-session-details">
        <h2>Session {`#${shorten(session.id)}`}</h2>
        <Map session={session}/>
        <SessionMetadataTable session={session} /> 
      </div>

      <div className="main-right-bar-session-tabs-container">
        <div className="main-right-bar-session-tabs-buttons">
          <button 
            className="tab-button" 
          >Events</button>
        </div>
        
        <div className="main-right-bar-session-tabs-content">
          <MainContentRightBarEvents events={session.events} session={session}/>
        </div>
      </div>
    </div>
  )
}

const MainContentRightBarEvents = ({events, session}) => {
  return (
    <ul>
      {events.map((e, i) => <RightBarEventListElement key={i} event={e} session={session}/>)}
    </ul>
  )
}

export default MainContentRightBar