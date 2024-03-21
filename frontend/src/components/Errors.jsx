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

      <table className="errors-list">
        <thead>
          <tr>
            <th>Time</th>
            <th>Last Trigger</th>
            <th>Line</th>
          </tr>
        </thead>
        <tbody>
          {errors.map((e, i) => <Error key={i} error={e} session={session} toggleErrorModal={toggleErrorModal}/>)}
        </tbody>
      </table>
      
      {activeError && <Modal error={activeError} session={session} toggle={toggleErrorModal}/>}
    </>
  )
}

export default Errors