import sessions from '../../mock-data/sessions'

const PORT = 3001
const BASE_URL = `http://localhost:${PORT}/api/projects`

const getSessions = async (projectId) => {
  try {
    // simulates an API call
    const response = await sessions
    return response
  } catch (e) {
    console.log(e)
  }
}


export default { 
  getSessions
}