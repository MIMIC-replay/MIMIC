import { requestDataExtractor } from "../../helpers/dataExtractors"

const Request = ({request, session}) => {
  const {time, type, latency, url, responseStatus} = requestDataExtractor(request, session)

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

export default Request