/** @vitest-environment jsdom */
import { render } from '@testing-library/react'
import { expect, test } from 'vitest'
import App from './App'

test('mounts the app', () => {
  expect(() => render(<App />)).not.toThrow()
})
