import axios from 'axios'

const PORT = import.meta.env.VITE_REACT_APP_PORT
const BASE_URL = `${import.meta.env.VITE_REACT_APP_BASE_URL}:${PORT}/api/login`

export const login = async (credentials) => {
  try {
    const response = await axios.post(BASE_URL, credentials)
    return response.data
  } catch (e) {
    console.error(e.message)
  }
}
