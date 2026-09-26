import type { APIGatewayProxyStructuredResultV2 } from 'aws-lambda'

export async function handler() {
  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json',
    },
    // API Gateway expects the response body to be a string.
    body: JSON.stringify({ status: 'ok' }),
  } satisfies APIGatewayProxyStructuredResultV2
}
