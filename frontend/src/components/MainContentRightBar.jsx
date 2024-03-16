import { useState } from "react"

import MainContentListMetadata from './singles/MainContentListMetadata'
import RightBarEventListElement from './singles/RightBarEventListElement'
import { sessionMetadataExtractor } from "../helpers/dataExtractors"

const MainContentRightBar = ({session}) => {
  const [activeTab, setActiveTab] = useState('events')

  const {
    id,
    url,
    time,
    viewport,
    https,
    location,
    os,
  } = sessionMetadataExtractor(session)


  const setActive = (e) => {
    setActiveTab(e.target.textContent)
  }

  return (
    <div className="main-right-bar">

      <div className="main-right-bar-session-details">
        <h2>Session {`#${id}`}</h2>
        <table>
          <tr>
            <td className="main-right-bar-key">URL</td>
            <td>{url}</td>
          </tr>
          <tr>
            <td className="main-right-bar-key">Started On</td>
            <td>{time}</td>
          </tr>
          <tr>
            <td className="main-right-bar-key">Location</td>
            <td>{location.slice(0, 31)}</td>
          </tr>
          <tr>
            <td className="main-right-bar-key">OS</td>
            <td>{`${os.name} ${os.version}`}</td>
          </tr>
          <tr>
            <td className="main-right-bar-key">Viewport Size</td>
            <td>{`${viewport.width}x${viewport.height}`}</td>
          </tr>
          <tr>
            <td className="main-right-bar-key">HTTPS</td>
            <td>{`${https}`}</td>
          </tr>
        </table>
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
          {activeTab === 'events' ? <MainContentRightBarEvents events={session.events} session={session}/> : null}
          {activeTab === 'metadata' ? <MainContentListMetadata session={session}/> : null}
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