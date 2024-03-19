import Error from './singles/Error'
import Modal from './Modal'
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
      {activeError && <Modal error={activeError} session={session} toggle={toggleErrorModal}/>}
    </>
  )
}

export default Errors