const RightBarEventListElement = ({event}) =>{
  return (
    <li>
      {event.name}
      {event.type}
      {event.time}
    </li>
  )  
}

export default RightBarEventListElement