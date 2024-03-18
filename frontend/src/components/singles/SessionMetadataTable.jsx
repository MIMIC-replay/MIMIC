import { sessionMetadataExtractor } from "../../helpers/dataExtractors"
const SessionMetadataTable = ({session}) => {
  const {
    time,
    url,
    viewport,
    https,
    location,
    os,
  } = sessionMetadataExtractor(session)

  return (
    <table>
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
        <td className="main-right-bar-key">OS</td>
        <td>{`${os.name} ${os.version}`}</td>
      </tr>
      <tr>
        <td className="main-right-bar-key">Viewport</td>
        <td>{`${viewport.width}x${viewport.height}`}</td>
      </tr>
      <tr>
        <td className="main-right-bar-key">HTTPS</td>
        <td>{`${https}`}</td>
      </tr>
    </table>
  )
}

export default SessionMetadataTable