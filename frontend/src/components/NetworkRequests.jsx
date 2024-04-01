import Request from "./singles/Request"

const NetworkRequests = ({requests, session}) => {
  if (requests.length === 0 ) return (
    <p className="no-requests">
      No Network Requests or Web Socket Messages ocurred in this session
    </p>
  )
  
  return (
    <table className="network-requests">
      <thead>
        <tr>
          <th>Time</th>
          <th>Type</th>
          <th>Method</th>
          <th>Status</th>
          <th>URL</th>
          <th>Latency</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((r, i) => <Request key={i} request={r} session={session}/>)}
      </tbody>
    </table>
  )
}

export default NetworkRequests