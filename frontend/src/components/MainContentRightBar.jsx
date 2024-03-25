import { useEffect, useState} from 'react'

import RightBarEventListElement from './singles/RightBarEventListElement'
import Map from "./singles/Map"
import SessionMetadataTable from "./singles/SessionMetadataTable"
import SearchIcon from './iconComponents/search'

import { shorten } from "../helpers/dataFormatters"
import { eventAnalyzer } from '../helpers/dataExtractors'


const MainContentRightBar = ({session}) => {
  const [events, setEvents] = useState(() => session.events)
  const [searchResultsEvents, setSearchResultsEvents] = useState(() => session.events)

  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    setEvents(session.events)

    const eventsFilteredByType = events.filter(e => {
      const {decodedType, source} = eventAnalyzer(e)
      if (decodedType !== 'IncrementalSnapshot') {
        return decodedType.toLowerCase().includes(searchInput.toLowerCase())
      } else {
        return source.toLowerCase().includes(searchInput.toLowerCase())
      }
    })

    setSearchResultsEvents(eventsFilteredByType)
  }, [session, searchInput, events])

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

          <div className='events-search'>
            <EventsSearch setSearchInput={setSearchInput}/>
          </div>
        </div>
        
        <div className="main-right-bar-session-tabs-content">
          <MainContentRightBarEvents events={searchResultsEvents} session={session}/>
        </div>
      </div>
    </div>
  )
}

const EventsSearch = ({setSearchInput}) => {

  return (
    <>
      <SearchIcon/>
      <input 
        className="events-search-input"
        type="text" 
        placeholder="Search events by type"
        onChange={(e) => setSearchInput(e.target.value)}
      ></input>
    </>
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