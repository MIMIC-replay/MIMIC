import Error from './singles/Error'
import Modal from './modal/Modal'
import { useState } from 'react'

const Errors = ({errors, session}) => {
  const [activeError, setActiveError] = useState(null)

  const toggleErrorModal = (error) => {
    setActiveError(activeError ? null : error)
  }

  return (
    <>
        
      <div className={`modal-overlay ${activeError ? 'active' : ''}`} onClick={toggleErrorModal}></div>

        { (errors.length > 0 && 
          <table className="errors-list">
            <thead>
              <tr>
                <th>Time</th>
                <th className='errors-list-trigger-header'>Last Trigger</th>
                <th>Payload</th>
                <th>Line</th>
              </tr>
            </thead>
            <tbody>
              {errors.map((e, i) => <Error key={i} error={e} session={session} toggleErrorModal={toggleErrorModal}/>)}
            </tbody>
          </table>) ||

          <p className='no-errors'>No errors ocurred duding this session</p>
        }
      
      {activeError && <Modal error={activeError} session={session} toggle={toggleErrorModal}/>}
    </>
  )
}

export default Errors