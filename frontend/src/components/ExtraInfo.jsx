import NetworkRequests from './NetworkRequests'
import ConsoleLogs from './ConsoleLogs'
import Errors from './Errors'
import ExtraInfoSearch from './singles/ExtraInfoSearch'

import { useState, useEffect } from 'react'

const ExtraInfo = ({session}) => {
  const [activeTab, setActiveTab] = useState('Network')
  const [requests, setRequests] = useState(() => session.network)
  const [searchResultsNetwork, setSearchResultsNetwork] = useState(() => session.network)

  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    setRequests(session.network)
    if (!searchInput) setSearchResultsNetwork(requests)

    const filteredByName = requests.filter(r => r.data.url.includes(searchInput))
    setSearchResultsNetwork(filteredByName)
  }, [session, setSearchInput, searchInput, requests])

  const setActive = (e) => {
    setActiveTab(e.target.textContent)
  }

  return (
    <div className="extra-info">
      <div className="extra-info-tab-controls">
        <ExtraInfoTabButtons activeTab={activeTab} setActive={setActive} />

        <div className='extra-info-search'>
          <ExtraInfoSearch activeTab={activeTab} setSearchInput={setSearchInput}/>
        </div>
      </div>

      <div className='extra-info-content'>
        {activeTab === 'Network' && requests.length > 0 ? 
          <NetworkRequests requests={searchResultsNetwork} session={session}/> : 
          null
        }
        {activeTab === 'Logs' ? <ConsoleLogs logs={session.logs}/> : null}
        {activeTab === 'Errors' ? <Errors errors={session.errors} session={session}/> : null}
      </div>
    </div>
  )
}

const ExtraInfoTabButtons = ({activeTab, setActive}) => {
  return (
    <>
      <button 
         className={`tab-button ${activeTab === 'Network' ? 'active' : ''}`} 
         onClick={setActive}
       >Network</button>
       <button 
         className={`tab-button ${activeTab === 'Logs' ? 'active' : ''}`} 
         onClick={setActive}
       >Logs</button>
       <button 
         className={`tab-button ${activeTab === 'Errors' ? 'active' : ''}`} 
         onClick={setActive}
       >Errors</button>
    </>
  )
} 


export default ExtraInfo