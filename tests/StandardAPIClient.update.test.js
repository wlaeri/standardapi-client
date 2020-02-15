import testClient from './testClient'
import { BASE_URL, API_KEY } from './mockData'

let response

beforeAll(async (done) => {
  try {
    response = await testClient.update('todos', {
      id: 1,
      status: 'COMPLETE'
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

test('should error when a baseModel isn\'t provided', async () => {
  expect.assertions(1)
  try {
    await testClient.update()
  } catch (e) {
    expect(e.message).toMatch(/required/)
  }
})

test('should error with an invalid baseModel', async () => {
  expect.assertions(1)
  try {
    await testClient.update(123)
  } catch (e) {
    expect(e.message).toMatch(/must be a string/)
  }
})

test('should error when a payload isn\'t provided', async () => {
  expect.assertions(1)
  try {
    await testClient.update('models')
  } catch (e) {
    expect(e.message).toMatch(/required/)
  }
})

test('should error with an empty object as a payload', async () => {
  expect.assertions(1)
  try {
    await testClient.update('models', {})
  } catch (e) {
    expect(e.message).toMatch(/cannot be empty/)
  }
})

test('should error when given a payload that doesn\'t have an id', async () => {
  expect.assertions(1)
  try {
    await testClient.update('models', { abc: 123 })
  } catch (e) {
    expect(e.message).toMatch(/No ID/)
  }
})
