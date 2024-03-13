import requests from '../../mock-data/requests'
import logs from '../../mock-data/logs'
import errors from '../../mock-data/errors'

import { useEffect, useState } from 'react'

const ExtraInfo = ({session}) => {
  // this is a main container, a grid, with one column, two rows
  // each row is a flexbox
  // row 1 contains the tabs console logs, errors, network
  // row 2 contains the actual info, Network requests, logs, errors

  const [activeTab, setActiveTab] = useState('network')
  const [requestsInList, setRequestsInList] = useState([])

  useEffect(() => {
    setRequestsInList(session.requests)
  }, [])

  const setActive = (e) => {
    setActiveTab(e.target.textContent)
  }

  const searchExtraInfo = (string) => {
    const filteredByName = session.requests.filter(r => r.name.includes(string))
    setRequestsInList(filteredByName)
  }

  return (
    <div className="extra-info">

      <div className="extra-info-tab-button">
        <button 
          className={`tab-button ${activeTab === 'network' ? 'active' : null}`} 
          onClick={setActive}
        >network</button>

        <button 
          className={`tab-button ${activeTab === 'logs' ? 'active' : null}`} 
          onClick={setActive}
        >logs</button>

        <button 
          className={`tab-button ${activeTab === 'errors' ? 'active' : null}`} 
          onClick={setActive}
        >errors</button>


        <div className='extra-info-search'>
          {activeTab === 'network' && <ExtraInfoSearch searchExtraInfo={searchExtraInfo}/>}
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
      🔎
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
          <th>Time</th>
          <th>Type</th>
          <th>Status</th>
          <th>Name</th>
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
  const {time, type, status, name, latency} = request

  return (
    <tr className="request">
      <td>{time}</td>
      <td>{type}</td>
      <td>{status}</td>
      <td>{name}</td>
      <td>{latency}</td>
    </tr>
  )
}


const ConsoleLogs = ({logs}) => {
  return (
    <ul className='logs-list'>
      {logs.map((l, i) => <Log key={i} log={l}/>)}
    </ul>
  )
}

const Log = ({log}) => {
  const {type, text} = log
  return (
    <li>
      {`${type} - ${text}`}
    </li>
  )
}

const Errors = ({errors}) => {
  return (
    <ul className='errors-list'>
      {errors.map((e, i) => <Error key={i} error={e}/>)}
    </ul>
  )
}

const Error = ({error}) => {
  const {content, line, payload} = error

  return (
    <li>
      {`${content.slice(0, 41)} - ${JSON.stringify(payload)} - Line: ${line}`}
    </li>
  )
}






export default ExtraInfo