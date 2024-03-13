import { useState } from "react"

const MainContentRightBar = ({session}) => {
  const [activeTab, setActiveTab] = useState('events')

  const {
    sessionId, 
    appName, 
    viewport, 
    https,
    location,
    browser,
    os,
    time
  } = session.metadata

  const setActive = (e) => {
    setActiveTab(e.target.textContent)
  }

  return (
    <div className="main-right-bar">
      <div className="main-right-bar-session-details">
        <h2>{`#${sessionId}`}</h2>
        <p>{appName}</p>
        <p>{`${time}`}</p>
        <p>{location}</p>
        <p>{os}</p>
        <p>{viewport}</p>
        <p>{browser}</p>
        <p>{`https: ${https}`}</p>

        {/* show more toggle?? */}

      </div>
      <div className="main-right-bar-session-tabs-container">
        <div className="main-right-bar-session-tabs-buttons">
        <button 
          className={`tab-button ${activeTab === 'events' ? 'active' : null}`} 
          onClick={setActive}
        >events</button>

        <button 
          className={`tab-button ${activeTab === 'metadata' ? 'active' : null}`} 
          onClick={setActive}
        >metadata</button>

        </div>
        <div className="main-right-bar-session-tabs-content">
          {activeTab === 'events' ? <MainContentRightBarEvents events={session.events}/> : null}
          {activeTab === 'metadata' ? <MainContentListMetadata metadata={session.metadata}/> : null}
        </div>
      </div>
    </div>
  )
}

const MainContentRightBarEvents = ({events}) => {
  return (
    <ul>
      {events.map((e, i) => <RightBarEventListElement key={i} event={e}/>)}
    </ul>
  )
}

const RightBarEventListElement = ({event}) =>{
  return (
    <li>
      {event.name}
      {event.type}
      {event.time}
    </li>
  )  
}

const MainContentListMetadata = ({metadata}) => {
  const {
    appName, 
    viewport, 
    https,
    location,
    browser,
    os,
    time
  } = metadata

  return (
    <ul>
        <li>{appName}</li>
        <li>{`${time}`}</li>
        <li>{location}</li>
        <li>{os}</li>
        <li>{viewport}</li>
        <li>{browser}</li>
        <p>{`https: ${https}`}</p>
    </ul>
  )
}

export default MainContentRightBar