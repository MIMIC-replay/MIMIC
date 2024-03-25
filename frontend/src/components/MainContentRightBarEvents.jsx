import RightBarEventListElement from './singles/RightBarEventListElement'

const MainContentRightBarEvents = ({events, session}) => {
  return (
    <ul>
      {events.map((e, i) => <RightBarEventListElement key={i} event={e} session={session}/>)}
    </ul>
  )
}

export default MainContentRightBarEvents
