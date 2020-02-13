import testClient from './testClient'
import { NEW_TODO, BASE_URL, API_KEY } from './mockData'

let response

beforeAll(async (done) => {
  try {
    response = await testClient.create('todo', NEW_TODO)
    done()
  } catch (err) {
    done(err)
  }
})

afterAll(() => {
  testClient.reset()
})

test('create request has the right baseUrl', () => {
  expect(response.config.baseURL).toBe(BASE_URL)
})

test('create request has the right authorization headers', () => {
  expect(response.config.headers['API-Key']).toBe(API_KEY)
})

test('mock response is successful', () => {
  expect(response.status).toBe(201)
})
