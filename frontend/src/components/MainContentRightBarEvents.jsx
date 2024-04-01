import RightBarEventListElement from './singles/RightBarEventListElement'

const MainContentRightBarEvents = ({events, session, inModal, toggle}) => {
  return (
    <ul>
      {events.map((e, i) => <RightBarEventListElement key={i} event={e} session={session} inModal={inModal} toggle={toggle}/>)}
    </ul>
  )
}

export default MainContentRightBarEvents
