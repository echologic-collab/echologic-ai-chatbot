import { createFileRoute } from '@tanstack/react-router'
import { authClient } from '../lib/auth-client'

const BACKEND_URL = 'http://localhost:8000'

export const Route = createFileRoute('/api/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const token = authClient.getToken()

          if (!token) {
            return new Response(
              JSON.stringify({ error: 'Unauthorized - No valid session' }),
              {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
              }
            )
          }

          // Forward the request to FastAPI backend
          const body = await request.json()
          
          const backendResponse = await fetch(`${BACKEND_URL}/api/chat`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body),
          })

          if (!backendResponse.ok) {
            const errorText = await backendResponse.text()
            console.error('Backend error:', errorText)
            return new Response(
              JSON.stringify({ error: 'Backend request failed', details: errorText }),
              {
                status: backendResponse.status,
                headers: { 'Content-Type': 'application/json' },
              }
            )
          }

          const data = await backendResponse.json()
          
          return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          })
        } catch (error: any) {
          console.error('Chat API proxy error:', error)
          return new Response(
            JSON.stringify({ error: 'Failed to process chat request', message: error.message }),
            {
              status: 500,
              headers: { 'Content-Type': 'application/json' },
            }
          )
        }
      },
    },
  },
})
