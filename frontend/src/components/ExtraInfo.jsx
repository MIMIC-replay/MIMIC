import { requestDataExtractor } from '../helpers/dataExtractors'

import { useState } from 'react'

const ExtraInfo = ({session}) => {


  const [activeTab, setActiveTab] = useState('network')
  const [requests] = useState(session.events.filter(e => e[0].type === 50).flat())
  const [requestsInList, setRequestsInList] = useState(requests)

  // should we flatter
  
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

const ExtraInfoSearch = ({searchExtraInfo}) => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      <input 
        type="text" 
        placeholder="Search request by name"
        onChange={(e) => searchExtraInfo(e.target.value)}
      ></input>
    </>
  )
}

const NetworkRequests = ({requests}) => {

  return (
    <table className="network-requests">
      <thead>
        <tr>
          <th>Received On</th>
          <th>Type</th>
          <th>Method</th>
          <th>Response</th>
          <th>URL</th>
          <th>Latency</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((r, i) => <Request key={i} request={r}/>)}
      </tbody>
    </table>
  )
}

const Request = ({request}) => {
  console.log(request)
  // const data = request.data

  // refactor, abstract later

  // const time = String(epochToDate(request.timestamp)).slice(0, 24)
  // const type = data.type
  // const latency = data.latency
  // const url = data.url.slice(0, 50)
  // const responseStatus = data.status

  const {time, type, latency, url, responseStatus} = requestDataExtractor(request)

  return (
    <tr className="request">
      <td>{time}</td>
      <td>{type}</td>
      <td>[METHOD]</td>
      <td>{responseStatus}</td>
      <td className='request-name'>{url}</td>
      <td>{latency}</td>
    </tr>
  )
}


const ConsoleLogs = ({logs}) => {
  return (
    <ul className='logs-list'>
      {/* {logs.map((l, i) => <Log key={i} log={l}/>)} */}
    </ul>
  )
}

const Log = ({log}) => {
  const {type, text} = log
  return (
    <li className='log'>
      <p className='log-type'>[WARNING]</p>
      <p className='log-message'>{`${type} - ${text}`}</p>
    </li>
  )
}

const Errors = ({errors}) => {
  return (
    <ul className='errors-list'>
      {/* {errors.map((e, i) => <Error key={i} error={e}/>)} */}
    </ul>
  )
}

const Error = ({error}) => {
  const {content, line, payload} = error

  return (
    <li className='error'>
      {`${content.slice(0, 41)} - ${JSON.stringify(payload)} - Line: ${line}`}
    </li>
  )
}






export default ExtraInfo