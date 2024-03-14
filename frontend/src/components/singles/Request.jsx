import { requestDataExtractor } from "../../helpers/dataExtractors"

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

export default Request