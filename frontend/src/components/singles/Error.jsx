const Error = ({error}) => {
  const {content, line, payload} = error

  return (
    <li className='error'>
      {`${content.slice(0, 41)} - ${JSON.stringify(payload)} - Line: ${line}`}
    </li>
  )
}

export default Error