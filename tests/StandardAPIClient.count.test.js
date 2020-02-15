import testClient from './testClient'
import { BASE_URL, API_KEY } from './mockData'

let response

beforeAll(async (done) => {
  try {
    response = await testClient.count('todos', {
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

test('create request has the right baseUrl', () => {
  expect(response.config.baseURL).toBe(BASE_URL)
})

test('create request has the right authorization headers', () => {
  expect(response.config.headers['API-Key']).toBe(API_KEY)
})

test('mock response is successful', () => {
  expect(response.status).toBe(200)
})

test('should error when a baseModel isn\'t provided', async () => {
  expect.assertions(1)
  try {
    await testClient.count()
  } catch (e) {
    expect(e.message).toMatch(/required/)
  }
})

test('should error when an invalid baseModel is provided', async () => {
  expect.assertions(1)
  try {
    await testClient.count(123)
  } catch (e) {
    expect(e.message).toMatch(/must be a string/)
  }
})
