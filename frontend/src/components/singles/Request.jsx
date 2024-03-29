import { useNavigate, useLocation} from "react-router-dom"

import { eventDataExtractor, relativeSeconds } from "../../helpers/dataExtractors"

const Request = ({request, session}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const {time, type, method, latency, url, responseStatus} = eventDataExtractor(request, session)
  const seconds = Math.floor(relativeSeconds(request, session))

  return (
    <tr className='request' onClick={() => navigate(`${location.pathname}?time=${seconds}`)}>
      <td>{time}</td>
      <td>{type}</td>
      <td className={method}>{method}</td>
      <td>{responseStatus}</td>
      <td className='request-name'>{url.length > 70 ? `${url.slice(0, 70)}...` : url}</td>
      <td>{latency}</td>
    </tr>
  )
}

export default Request