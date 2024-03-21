import NetworkRequests from './NetworkRequests'
import ConsoleLogs from './ConsoleLogs'
import Errors from './Errors'
import ExtraInfoSearch from './singles/ExtraInfoSearch'

import { useState, useEffect } from 'react'

const ExtraInfo = ({session}) => {
  const [activeTab, setActiveTab] = useState('Network')

  const [network, setNetwork] = useState(() => session.network)
  const [logs, setLogs] = useState(() => session.logs)
  const [errors, setErrors] = useState(() => session.errors)

  const [searchResultsNetwork, setSearchResultsNetwork] = useState(() => session.network)
  const [searchResultsLogs, setSearchResultsLogs] = useState(() => session.logs)
  const [searchResultsErrors, setSearchResultsErrors] = useState(() => session.errors)

  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    setNetwork(session.network)
    setLogs(session.logs)
    setErrors(session.errors)

    const networkFilteredByName = network.filter(r => {
      return r.data.url.toLowerCase().includes(searchInput.toLowerCase())
    })
    setSearchResultsNetwork(networkFilteredByName)

    const logsFilteredByType = logs.filter(l => {
      console.log(l)
      console.log(searchInput)
      console.log(l.data.payload.payload[0])
      return l.data.payload.payload[0].toLowerCase().includes(searchInput.toLowerCase())
    })
    setSearchResultsLogs(logsFilteredByType)

    const filteredByName = errors.filter(e => {
      return e.data.payload.trace.join().toLowerCase().includes(searchInput.toLowerCase())
    })

    setSearchResultsErrors(filteredByName)
  }, [session, searchInput, network, logs, errors])

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
        {activeTab === 'Network' && network.length > 0 ? 
          <NetworkRequests requests={searchResultsNetwork} session={session}/> : 
          null
        }
        {activeTab === 'Logs' ? <ConsoleLogs logs={searchResultsLogs} session={session}/> : null}
        {activeTab === 'Errors' ? <Errors errors={searchResultsErrors} session={session}/> : null}
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