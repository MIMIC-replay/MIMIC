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
    // const response = await axios.get(
    //   'https://468f-38-99-108-149.ngrok-free.app/api/project/986953cc-b0d6-4a54-a026-0bad9a629656',
    // config)
    // console.log(response.data.sessions)

    // return response.data.sessions

    return [sessions[0], {...sessions[0], id: 3, 
      events: [
        ...sessions[0].events, 
        ...sessions[0].events
      ]
    }
    ]

  } catch (e) {
    console.error(e)
    return []
  }
}


export default { 
  getSessions
}
