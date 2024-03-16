import Error from './singles/Error'

const Errors = ({errors, session}) => {
  return (
    <ul className='errors-list'>
      {errors.map((e, i) => <Error key={i} error={e} session={session}/>)}
    </ul>
  )
}

export default Errors