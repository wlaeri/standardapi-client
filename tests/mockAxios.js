import MockAdapter from 'axios-mock-adapter'
import { TODOS, NEW_TODO, UPDATED_TODO } from './mockData'

export default (axiosInstance) => {
  const mockAxios = new MockAdapter(axiosInstance)

  mockAxios.onGet().reply(200, TODOS)
  mockAxios.onPost().reply(201, TODOS.concat(NEW_TODO))
  mockAxios.onPatch().reply(200, TODOS.filter(t => t.id !== UPDATED_TODO.id))
  mockAxios.onDelete().reply(200)
  
  return mockAxios
}
