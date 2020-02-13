import StandardAPIClient from '../src/StandardAPIClient'
import mockAxios from './mockAxios'
import { BASE_URL, API_KEY } from './mockData'

const client = new StandardAPIClient({
  baseURL: BASE_URL,
  headers: {
    'API-Key': API_KEY 
  }
})

const mocks = mockAxios(client.__axios)
client.reset = () => mocks.reset()

export default client
