const Log = ({log}) => {
  const {type, text} = log
  return (
    <li className='log'>
      <p className='log-type'>[WARNING]</p>
      <p className='log-message'>{`${type} - ${text}`}</p>
    </li>
  )
}

export default Log