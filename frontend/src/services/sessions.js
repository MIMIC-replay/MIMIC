import sessions from '../../mock-data/sessions'

const getSessions = async () => {
  // simulates an API call
  const response = await sessions
  return response
}


export default { 
  getSessions
}