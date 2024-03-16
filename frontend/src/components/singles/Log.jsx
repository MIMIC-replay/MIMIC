const Log = ({log, session}) => {
  // const {type, text} = log
  const [time, type, message] = ['123', '12321', '1231']
  
  return (
    <li className='log'>
      <p className='log-type'>[TYPE]{` type: ${log.type}`}</p>
      <p className='log-message'>{log.data.payload.payload}</p>
    </li>
      // <tr className="log">
      //   <td className="time">{`time`}</td>
      //   <td className="type">{`type`}</td>
      //   <td className="message">{`message`}</td>
      // </tr>
  )
}

export default Log