import { createServer } from 'node:http'
import { handler } from './main.js'

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? '/', 'http://127.0.0.1:3001')

  if (request.method !== 'GET' || url.pathname !== '/health') {
    response.writeHead(404)
    response.end('Not found')
    return
  }

  try {
    const result = await handler()

    response.writeHead(result.statusCode, result.headers)
    response.end(result.body)
  } catch (error) {
    console.error(error)
    response.writeHead(500)
    response.end('Internal server error')
  }
})

server.listen(3001, '127.0.0.1', () => {
  console.log('Backend running at http://127.0.0.1:3001')
})
