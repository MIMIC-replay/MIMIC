import NetworkRequests from './NetworkRequests'
import ConsoleLogs from './ConsoleLogs'
import Errors from './Errors'

import ExtraInfoSearch from './singles/ExtraInfoSearch'


import { useState } from 'react'

const ExtraInfo = ({session}) => {
  const [activeTab, setActiveTab] = useState('network')
  const [requests] = useState(session.events.filter(e => e[0].type === 50).flat())
  const [requestsInList, setRequestsInList] = useState(requests)

  // should we flatten
  const setActive = (e) => {
    setActiveTab(e.target.textContent)
  }

  const searchExtraInfo = (string) => {
    const filteredByName = requests.filter(r => r.data.url.includes(string))
    setRequestsInList(filteredByName)
  }

  return (
    <div className="extra-info">

      <div className="extra-info-tab-controls">
        <button 
          className={`tab-button ${activeTab === 'network' ? 'active' : ''}`} 
          onClick={setActive}
        >network</button>

        <button 
          className={`tab-button ${activeTab === 'logs' ? 'active' : ''}`} 
          onClick={setActive}
        >logs</button>

        <button 
          className={`tab-button ${activeTab === 'errors' ? 'active' : ''}`} 
          onClick={setActive}
        >errors</button>


        <div className='extra-info-search'>
          <ExtraInfoSearch searchExtraInfo={searchExtraInfo}/>
        </div>
      </div>

      <div className='extra-info-content'>
        {activeTab === 'network' ? <NetworkRequests requests={requestsInList}/> : null}
        {activeTab === 'logs' ? <ConsoleLogs logs={session.logs}/> : null}
        {activeTab === 'errors' ? <Errors errors={session.errors}/> : null}
      </div>

    </div>
  )
}


export default ExtraInfo