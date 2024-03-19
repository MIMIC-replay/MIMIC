import { sessionMetadataExtractor } from "../../helpers/dataExtractors"

const SessionMetadataTable = ({session}) => {
  const {
    time,
    url,
    https,
    location,
    os,
    ip,
  } = sessionMetadataExtractor(session)

  return (
    <table>
      <tbody>
        <tr>
          <td className="main-right-bar-key">URL</td>
          <td>{url}</td>
        </tr>
        <tr>
          <td className="main-right-bar-key">Started On</td>
          <td>{String(time)}</td>
        </tr>
        <tr>
          <td className="main-right-bar-key">Location</td>
          <td>{location.slice(0, 31)}</td>
        </tr>
        <tr>
          <td className="main-right-bar-key">IP</td>
          <td>{ip}</td>
        </tr>
        <tr>
          <td className="main-right-bar-key">OS</td>
          <td>{`${os.name} ${os.version}`}</td>
        </tr>
        <tr>
          <td className="main-right-bar-key">HTTPS</td>
          <td>{`${https}`}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default SessionMetadataTable