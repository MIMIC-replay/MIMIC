import sessions from '../../mock-data/TESTsessions.json'
import axios from 'axios'

const PORT = 3001
const BASE_URL = `http://localhost:${PORT}/api/project`


let token = null // private variable to this module

export const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export const getSessions = async (projectId) => {
  // only token bearers can access???
  // use this:
  //
  // const config = { headers: {
  //   Authorization: token
  // } }
  // 


  // simulates an API call

  try {
    // const response = await axios.get(
    //   `${BASE_URL}/986953cc-b0d6-4a54-a026-0bad9a629656`
    //  )
    //  console.log(response.data.sessions)

    //  return response.data.sessions

    return [sessions[0], {...sessions[0], id:"766ygdf-6546465d-gdfgfd-6565g5gg", 
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
