import sessions from '../../mock-data/TESTsessions.json'
import axios from 'axios'

const PORT = 3001
const BASE_URL = `http://localhost:${PORT}/api/projects`

const getSessions = async (projectId) => {
  // simulates an API call

  try {
    // console.log(sessions)
    // const response = await JSON.parse(sessions)
    // const response = await axios.get(TEST_URL)
    // console.log([sessions])
    return sessions
  } catch (e) {
    console.log(e)
  }
}


export default { 
  getSessions
}
