import { useState } from "react"

const MainContentRightBar = ({session}) => {
  const [activeTab, setActiveTab] = useState('events')

  const metadata = session.metadata

  const id = session.id
  const appName = metadata.url
  const time = metadata.date
  const viewport = metadata.viewport
  const https = metadata.https
  const location = metadata.location
  const os = metadata.os

  const setActive = (e) => {
    setActiveTab(e.target.textContent)
  }

  return (
    <div className="main-right-bar">
      <div className="main-right-bar-session-details">
        <h2>Session {`#${id}`}</h2>
        <p><span className="main-right-bar-key">URL: </span>{appName}</p>
        <p><span className="main-right-bar-key">Visited: </span>{time}</p>
        <p><span className="main-right-bar-key">Location: </span>{location}</p>
        <p><span className="main-right-bar-key">OS: </span>{`${os.name} ${os.version}`}</p>
        <p><span className="main-right-bar-key">Viewport Size: </span>{`${viewport.width} ${viewport.height}`}</p>
        <p><span className="main-right-bar-key">SSL: </span>{`${https}`}</p>

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
          {activeTab === 'events' ? <MainContentRightBarEvents events={session.events}/> : null}
          {activeTab === 'metadata' ? <MainContentListMetadata session={session}/> : null}
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

const MainContentListMetadata = ({session}) => {
  const metadata = session.metadata

  const id = session.id
  const appName = metadata.url
  const time = metadata.date
  const viewport = metadata.viewport
  const https = metadata.https
  const location = metadata.location
  const os = metadata.os

  return (
    <ul>
        <li>{`#${id}`}</li>
        <li>{appName}</li>
        <li>{time}</li>
        <li>{location}</li>
        <li>{`${os.name} ${os.version}`}</li>
        <li>{`${viewport.width} ${viewport.height}`}</li>
        <li>{`https: ${https}`}</li>
    </ul>
  )
}

export default MainContentRightBar