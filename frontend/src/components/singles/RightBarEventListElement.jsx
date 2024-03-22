import { eventAnalyzer, relativeTime } from "../../helpers/dataExtractors"

const RightBarEventListElement = ({event, session}) =>{
  
  // {
  //   numberType,
  //   decodedType,
  //   isUserInteraction,
  //   source,
  //   isMouseInteraction,
  //   mouseInteraction,
  // } = eventAnalyzer(event)

  const eventData = eventAnalyzer(event)

  const time = relativeTime(event, session)
  return (
    <li className="right-bar-event-element">
      <div>
        <p>{time}</p>
        <EventTypeIcon eventData={eventData}/>
        <p>{eventData.source.includes('Mouse') ? 'MouseInteraction' : eventData.decodedType}</p>
      </div>
    </li>
  )  
}

const EventTypeIcon = ({eventData}) => {
  if (eventData.source.includes('Mouse')) {
    return( 
      <svg 
        width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" 
        xmlns="http://www.w3.org/2000/svg" color="#000000" className="feather mouse" 
        >
          <path d="M12 2V2C16.4183 2 20 5.58172 20 10V14C20 18.4183 16.4183 22 12 22V22C7.58172 22 4 18.4183 4 14V10C4 5.58172 7.58172 2 12 2V2ZM12 2V9" 
          stroke="#000000" strokeWidth="1.5" strokeLinecap="round"></path>
      </svg>
    )
  } else if (eventData.decodedType.includes('Network')) {
    return (
      <svg 
        fill="#000000" height="24" width="24" className="feather icon" version="1.1" 
        id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
        viewBox="0 0 512 512" xmlSpace="preserve">
        <g>
          <g>
            <path d="M508.645,18.449c-2.929-2.704-7.133-3.51-10.826-2.085L6.715,204.446c-3.541,1.356-6.066,4.515-6.607,8.264
              c-0.541,3.75,0.985,7.496,3.995,9.796l152.127,116.747c-0.004,0.116-0.575,0.224-0.575,0.342v83.592
              c0,3.851,2.663,7.393,6.061,9.213c1.541,0.827,3.51,1.236,5.199,1.236c2.026,0,4.181-0.593,5.931-1.756l56.12-37.367
              l130.369,99.669c1.848,1.413,4.099,2.149,6.365,2.149c1.087,0,2.186-0.169,3.248-0.516c3.27-1.066,5.811-3.672,6.786-6.974
              L511.571,29.082C512.698,25.271,511.563,21.148,508.645,18.449z M170.506,321.508c-0.385,0.36-0.7,0.763-1.019,1.163
              L31.659,217.272L456.525,54.557L170.506,321.508z M176.552,403.661v-48.454l33.852,25.887L176.552,403.661z M359.996,468.354
              l-121.63-93.012c-1.263-1.77-2.975-3.029-4.883-3.733l-47.29-36.163L480.392,60.86L359.996,468.354z"/>
          </g>
        </g>
      </svg>
    )
  } else if (eventData.decodedType === 'Meta') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
    )
  }
}

export default RightBarEventListElement