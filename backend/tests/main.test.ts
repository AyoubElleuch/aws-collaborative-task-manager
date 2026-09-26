import { describe, expect, test } from 'vitest'
import { handler } from '../src/main.js'

describe('health handler', () => {
  test('returns HTTP 200', async () => {
    const response = await handler()

    expect(response.statusCode).toBe(200)
  })

  test('declares a JSON response', async () => {
    const response = await handler()

    expect(response.headers['content-type']).toBe('application/json')
  })

  test('returns the documented health body as valid JSON', async () => {
    const response = await handler()

    expect(typeof response.body).toBe('string')
    expect(JSON.parse(response.body)).toEqual({ status: 'ok' })
  })
})
