import { sessionMetadataExtractor } from "../../helpers/dataExtractors"

const SessionMetadataTable = ({session}) => {
  const {
    time,
    url,
    https,
    os,
    ip,
    city,
    country,
    region,
    browser,
  } = sessionMetadataExtractor(session)

  const date = time.match(/^(.+)T/)[1]
  const exactTime = time.match(/T(.{8})/)[1]

  return (
    <table>
      <tbody>
        <tr>
          <td className="main-right-bar-key">URL</td>
          <td>{url}</td>
        </tr>
        <tr>
          <td className="main-right-bar-key">Date</td>
          <td>{date}</td>
        </tr>
        <tr>
          <td className="main-right-bar-key">Time</td>
          <td>{exactTime}</td>
        </tr>
        <tr>
          <td className="main-right-bar-key">Location</td>
          <td>{`${city}, ${region}, ${country}`}</td>
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
          <td className="main-right-bar-key">Browser</td>
          <td>{`${browser.name} ${browser.version}`}</td>
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