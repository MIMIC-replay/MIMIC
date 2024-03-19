import { useState } from "react"

import MainContentListMetadata from './singles/MainContentListMetadata'
import RightBarEventListElement from './singles/RightBarEventListElement'
import { sessionMetadataExtractor } from "../helpers/dataExtractors"
import Map from "./singles/Map"
import SessionMetadataTable from "./singles/SessionMetadataTable"

const MainContentRightBar = ({session}) => {
  const [activeTab, setActiveTab] = useState('Events')

  const setActive = (e) => {
    setActiveTab(e.target.textContent)
  }

  return (
    <div className="main-right-bar">

      <div className="main-right-bar-session-details">
        <h2>Session {`#${session.id}`}</h2>
        <Map session={session}/>
        <SessionMetadataTable session={session} /> 
      </div>

      <div className="main-right-bar-session-tabs-container">
        <div className="main-right-bar-session-tabs-buttons">
        <button 
          // className={`tab-button ${activeTab === 'Events' ? 'active' : null}`} 
          className="tab-button" 
          onClick={setActive}
        >Events</button>

        {/* <button 
          className={`tab-button ${activeTab === 'Metadata' ? 'active' : null}`} 
          onClick={setActive}
        >Metadata</button> */}

        {/* <button 
          className={`tab-button ${activeTab === 'metadata' ? 'active' : null}`} 
          onClick={setActive}
        >🔥</button>

        <button 
          className={`tab-button ${activeTab === 'metadata' ? 'active' : null}`} 
          onClick={setActive}
        >📤</button> */}

        </div>
        <div className="main-right-bar-session-tabs-content">
          {/* {activeTab === 'Events' ? <MainContentRightBarEvents events={session.events} session={session}/> : null}
          {activeTab === 'Metadata' ? <MainContentListMetadata session={session}/> : null} */}
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