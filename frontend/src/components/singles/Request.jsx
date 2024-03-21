import { eventDataExtractor } from "../../helpers/dataExtractors"

const Request = ({request, session}) => {
  const {time, type, method, latency, url, responseStatus} = eventDataExtractor(request, session)

  return (
    <tr className="request">
      <td>{time}</td>
      <td>{type}</td>
      <td>{method}</td>
      <td>{responseStatus}</td>
      <td className='request-name'>{url}</td>
      <td>{latency}</td>
    </tr>
  )
}

export default Request