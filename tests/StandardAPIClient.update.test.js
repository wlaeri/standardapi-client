import testClient from './testClient'
import { BASE_URL, API_KEY } from './mockData'

let response

beforeAll(async (done) => {
  try {
    response = await testClient.update('todos', {
      id: 1,
      status: 'COMPLETE'
    }, {
      limit: 10,
      offset: 10
    })
    done()
  } catch (err) {
    done(err)
  }
})

afterAll(() => {
  testClient.reset()
})

test('update request has the right baseUrl', () => {
  expect(response.config.baseURL).toBe(BASE_URL)
})

test('update request has the right authorization headers', () => {
  expect(response.config.headers['API-Key']).toBe(API_KEY)
})

test('mock response is successful', () => {
  expect(response.status).toBe(200)
})
