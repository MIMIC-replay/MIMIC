import NetworkRequests from './NetworkRequests'
import ConsoleLogs from './ConsoleLogs'
import Errors from './Errors'

import ExtraInfoSearch from './singles/ExtraInfoSearch'


import { useState } from 'react'
import { CustomScroll } from 'react-custom-scroll'

const ExtraInfo = ({session}) => {
  const [activeTab, setActiveTab] = useState('Network')
  const [requests] = useState(session.events.filter(e => e.type === 50).flat())
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


        <div className='extra-info-search'>
          <ExtraInfoSearch searchExtraInfo={searchExtraInfo}/>
        </div>
      </div>

      <div className='extra-info-content'>
        {activeTab === 'Network' && requestsInList.length > 0 ? 
          <NetworkRequests requests={requestsInList} session={session}/> : 
          null}
        {activeTab === 'Logs' ? <ConsoleLogs logs={session.logs}/> : null}
        {activeTab === 'Errors' ? <Errors errors={session.errors} session={session}/> : null}
      </div>
    </div>
  )
}


export default ExtraInfo