import Request from "./singles/Request"

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

export default NetworkRequests