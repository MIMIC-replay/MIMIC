import sessions from '../../mock-data/TESTsessions.json'
import axios from 'axios'

const PORT = 3001
const BASE_URL = `http://localhost:${PORT}/api/projects`

const getSessions = async (projectId) => {
  // simulates an API call

  const config = {
    headers: {
      'ngrok-skip-browser-warning': 'true'
    }
  }

  try {
    // console.log(sessions)
    // const response = await JSON.parse(sessions)
    // const response = await axios.get(TEST_URL)
    // console.log(sessions)
    const response = await axios.get('https://468f-38-99-108-149.ngrok-free.app/', config)
    console.log(response.data)

    return [sessions[0], {...sessions[0], id: 3}]
  } catch (e) {
    console.log(e)

    return [sessions[0], {...sessions[0], id: 3}] 
  }
}


export default { 
  getSessions
}
