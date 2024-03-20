import { errorDataExtractor } from "../../helpers/dataExtractors"
import SessionMetadataTable from "../singles/SessionMetadataTable"

const Modal = ({error, session, toggle}) => {
  const {time, trigger, trace} = errorDataExtractor(error)


  return (
    <div className='modal'>
      <button onClick={toggle}>✖</button>
      <h2>{trigger}</h2>

      <div className="body"></div>

      <div className="data-container">
        <div className="metadata">
          <h2>Session Data</h2>
          <SessionMetadataTable session={session}/>
        </div>
        <div className="user">
          <h2>User Info</h2>
        </div>
      </div>
      
      <div className="stacktrace">{trace}</div>
    </div>
  )
}

export default Modal