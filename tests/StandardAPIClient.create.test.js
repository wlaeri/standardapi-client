import testClient from './testClient'
import { NEW_TODO, BASE_URL, API_KEY } from './mockData'

let response

beforeAll(async (done) => {
  try {
    response = await testClient.create('todos', NEW_TODO)
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

test('should error when a baseModel isn\'t provided', async () => {
  expect.assertions(1)
  try {
    await testClient.create()
  } catch (e) {
    expect(e.message).toMatch(/required/)
  }
})

test('should error when an invalid baseModel is provided', async () => {
  expect.assertions(1)
  try {
    await testClient.create(123)
  } catch (e) {
    expect(e.message).toMatch(/must be a string/)
  }
})

test('should error when a payload isn\'t provided', async () => {
  expect.assertions(1)
  try {
    await testClient.create('models')
  } catch (e) {
    expect(e.message).toMatch(/required/)
  }
})

test('should error with an empty object as a payload', async () => {
  expect.assertions(1)
  try {
    await testClient.create('models', {})
  } catch (e) {
    expect(e.message).toMatch(/cannot be empty/)
  }
})
