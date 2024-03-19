import { sessionMetadataExtractor } from "../../helpers/dataExtractors"

const SessionContentHeader = ({session}) => {
  const {id, url, https} = sessionMetadataExtractor(session)

  return (
    <header>
      {`${https ? 
          '🔒' : 
          '🔓' 
        }
        Session #${id} - ${url} - 
        some other info??`}
    </header>
  )
}

export default SessionContentHeader