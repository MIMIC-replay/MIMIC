import axios from 'axios'

const BASE_URL = 'https://nominatim.openstreetmap.org/search?format=json&q='

export const getLatLon = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}${city}`)
    if (response.data.length === 0) return null

    return [response.data[0].lat, response.data[0].lon]
  } catch (e) {
    console.error(e)
  }
}