import axios from 'axios'

const PORT = 3001
const BASE_URL = `http://localhost:${PORT}/api/project`

let token = null // private variable to this module

export const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export const getSessions = async (projectId) => {
  const config = { headers: {
    Authorization: token
  } }

  try {
    const response = await axios.get(
      `${BASE_URL}/${projectId}`,
      config
     )

     return response.data.sessions
  } catch (e) {
    console.error(e)
  }
}
