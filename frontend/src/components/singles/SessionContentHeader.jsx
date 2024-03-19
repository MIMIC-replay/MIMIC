import { sessionMetadataExtractor } from "../../helpers/dataExtractors"
import { short } from "../../helpers/dataFormatters"

const SessionContentHeader = ({session}) => {
  const {id, url, https} = sessionMetadataExtractor(session)

  return (
    <header>
      {`${https ? 
          '🔒' : 
          '🔓' 
        }
        Session #${short(id)} - ${url}`}
    </header>
  )
}

export default SessionContentHeader