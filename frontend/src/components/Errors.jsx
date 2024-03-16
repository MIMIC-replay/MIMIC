import Error from './singles/Error'
import { useState } from 'react'

const Errors = ({errors, session}) => {
  const [activeError, setActiveError] = useState(null)

  const toggleErrorModal = (error) => {
    setActiveError(activeError ? null : error)
  }

  return (
    <>
      <div className={`modal-overlay ${activeError ? 'active' : ''}`} onClick={toggleErrorModal}></div>
      <ul className='errors-list'>
        {errors.map((e, i) => <Error key={i} error={e} session={session} toggleErrorModal={toggleErrorModal}/>)}
      </ul>
      {activeError && <Modal error={activeError} />}
    </>
  )
}

const Modal = ({error}) => {
  console.log(error)
  return (
    <div className='modal'>
      
    </div>
  )
}

export default Errors