import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/login'

export const login = async (credentials) => {
  // we send projectname, password
  const response = await axios.post(baseUrl, credentials)
  return response.data
}