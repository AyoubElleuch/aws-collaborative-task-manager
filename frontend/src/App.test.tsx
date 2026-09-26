/** @vitest-environment jsdom */
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import App from './App'

const fetchMock = vi.fn<typeof fetch>()

beforeEach(() => {
  fetchMock.mockReset()
  vi.stubEnv('VITE_HEALTH_URL', '/health')
  vi.stubGlobal('fetch', fetchMock)
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
})

test('shows success when the API reports healthy', async () => {
  fetchMock.mockResolvedValueOnce(
    new Response(JSON.stringify({ status: 'ok' }), { status: 200 }),
  )

  render(<App />)
  fireEvent.click(screen.getByRole('button', { name: 'Check connection' }))

  expect(
    await screen.findByText('The service is available.'),
  ).toBeTruthy()

  expect(fetchMock).toHaveBeenCalledWith(
    '/health',
    expect.objectContaining({ signal: expect.anything() }),
  )
})

test('shows failure when the API returns an HTTP error', async () => {
  fetchMock.mockResolvedValueOnce(new Response(null, { status: 503 }))

  render(<App />)
  fireEvent.click(screen.getByRole('button', { name: 'Check connection' }))

  expect(
    await screen.findByText('Connection failed. Please try again.'),
  ).toBeTruthy()
})

test('shows failure when the response body is unexpected', async () => {
  fetchMock.mockResolvedValueOnce(
    new Response(JSON.stringify({ status: 'down' }), { status: 200 }),
  )

  render(<App />)
  fireEvent.click(screen.getByRole('button', { name: 'Check connection' }))

  expect(
    await screen.findByText('Connection failed. Please try again.'),
  ).toBeTruthy()
})

test('shows failure when the network request fails', async () => {
  fetchMock.mockRejectedValueOnce(new TypeError('Failed to fetch'))

  render(<App />)
  fireEvent.click(screen.getByRole('button', { name: 'Check connection' }))

  expect(
    await screen.findByText('Connection failed. Please try again.'),
  ).toBeTruthy()

  expect(
    screen.getByRole('button', { name: 'Check connection' })
      .hasAttribute('disabled'),
  ).toBe(false)
})

test('disables the button while the request is pending', () => {
  fetchMock.mockReturnValueOnce(
    new Promise<Response>(() => {
      // Keep the request pending to inspect the loading state.
    }),
  )

  render(<App />)
  fireEvent.click(screen.getByRole('button', { name: 'Check connection' }))

  expect(screen.getByRole('status').textContent).toBe('Checking connection…')

  expect(
    screen.getByRole('button', { name: 'Checking…' })
      .hasAttribute('disabled'),
  ).toBe(true)
})
