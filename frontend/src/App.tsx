import { useState } from 'react'

type ConnectionStatus = 'idle' | 'checking' | 'healthy' | 'error'

const messages = {
  idle: 'Check the connection to get started.',
  checking: 'Checking connection…',
  healthy: 'The service is available.',
  error: 'Connection failed. Please try again.',
}

function App() {
  const [status, setStatus] = useState<ConnectionStatus>('idle')

  async function checkConnection() {
    setStatus('checking')

    try {
      const healthUrl = import.meta.env.VITE_HEALTH_URL

      if (!healthUrl) {
        throw new Error('Health URL is not configured')
      }

      const response = await fetch(healthUrl, {
        signal: AbortSignal.timeout(10000),
      })

      if (!response.ok) {
        throw new Error('Health request failed')
      }

      const body = await response.json()

      if (body?.status !== 'ok') {
        throw new Error('Unexpected health response')
      }

      setStatus('healthy')
    } catch {
      setStatus('error')
    }
  }

  return (
    <main>
      <h1>Collaborative Task Manager</h1>
      <p>Organize projects and tasks with your team.</p>

      <button
        type="button"
        onClick={checkConnection}
        disabled={status === 'checking'}
      >
        {status === 'checking' ? 'Checking…' : 'Check connection'}
      </button>

      <p role="status">{messages[status]}</p>
    </main>
  )
}

export default App
