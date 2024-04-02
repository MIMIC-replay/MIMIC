import axios from 'axios'

// const PORT = import.meta.env.VITE_REACT_APP_PORT
// const BASE_URL = `${import.meta.env.VITE_REACT_APP_BASE_URL}:${PORT}/api/project`
const BASE_URL = '/api/project'

let token = null 

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
