import { useState } from "react"
import { errorDataExtractor, recentEventsFromError, traceDataExtractor } from "../../helpers/dataExtractors"
import MainContentRightBarEvents from "../MainContentRightBarEvents"
import SessionMetadataTable from "../singles/SessionMetadataTable"

const Modal = ({error, session, toggle}) => {
  const {time, trigger, trace} = errorDataExtractor(error)

  const triggerMatch = traceDataExtractor(trace[0]).link.match(/(.+):\d+:\d+$/)
  const triggerSubtitle = triggerMatch ? triggerMatch[1] : trace[0]
  const lines = triggerMatch ? 
    traceDataExtractor(trace[0]).link.match(/:(\d+):\d+$/)[1] :
    null

  return (
    <div className='modal'>
      <button className="modal-close" onClick={toggle}>✖</button>
      <h2 className="trigger-title">{trigger}</h2>
      <h3 className="trigger-subtitle">
        in {triggerSubtitle}
      </h3>
      <h3 className="trigger-subtitle">
        line <span className="trigger-line-number">{lines}</span>
      </h3>
      <div className="body"></div>

      <div className="data-container">
        
        <div className="last-three-events">
          <h2>Recent Events</h2>
          <MainContentRightBarEvents events={recentEventsFromError(error, session.events)} session={session}/>
        </div>

        <div className="metadata">
          <h2>Session Data</h2>
          <SessionMetadataTable session={session}/>
        </div>
      </div>
      
      <StackTrace trace={trace}/>
    </div>
  )
}

const StackTrace = ({trace}) => {
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [hoveringTrace, setHoveringTrace] = useState({})

  const handleMouseMove = (e) => {

    setTooltipPosition(
        { 
          x: e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft, 
          y: e.clientY + document.body.scrollTop + document.documentElement.scrollTop
        }
      );
    };
    
  const handleMouseEnter = (trace) => {
    setHoveringTrace(trace)
    document.addEventListener('mousemove', handleMouseMove)
  };
  
  const handleMouseLeave = () => {
    setHoveringTrace({})
    document.removeEventListener('mousemove', handleMouseMove)
  };

  const modalOffset = {y: -80, x: -150}

  return (
    <>
      { hoveringTrace.functionCall &&
        <div 
          className={`trace-hovering-details ${hoveringTrace.functionCall ? 'active' : ''}`}
          style={{ top: tooltipPosition.y + modalOffset.y, left: tooltipPosition.x + modalOffset.x }}
        >
          <p className="trace-tooltip-function">{hoveringTrace.functionCall}</p>
          <p className="trace-tooltip-link">{hoveringTrace.link}</p>
        </div>
      }
      <table className="stacktrace">
        <thead>
          <tr>
            <th className="trace-header-index">Index</th>
            <th className="trace-header-function">Function</th>
            <th className="trace-header-link">Link</th>
          </tr>
        </thead>
        <tbody>
          {trace.map((e, i) => <TraceElement 
            key={e} 
            traceElement={e} 
            index={i} 
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave} 
        />)}
        </tbody>
      </table>
    </>
  )
}

const TraceElement = ({traceElement, index, handleMouseEnter, handleMouseLeave}) => {
  const {functionCall, link} = traceDataExtractor(traceElement)

  const shortFunction = functionCall.length >= 30 ? 
    `${functionCall.slice(0, 26)}...` :
    functionCall
  const shortLink = link.length >= 98 ?
    `${link.slice(0, 98)}...` :
    link
  return (
      <tr 
        className="trace"
        onMouseEnter={() => handleMouseEnter({functionCall, link})} 
        onMouseLeave={handleMouseLeave}
      >
        <td className="trace-index">{index}</td>
        <td className="trace-function">{shortFunction}</td>
        <td className="trace-link">{shortLink}</td>
      </tr>
  )
}

export default Modal