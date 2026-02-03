import { useState } from 'react'
import { authClient } from './auth-client'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export const useBackendChat = () => {
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = async (userMessage: string) => {
    if (!userMessage.trim()) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    setIsLoading(true)
    setError(null)

    try {
      const backendBase = import.meta.env.VITE_BACKEND_URL
      const url = backendBase
        ? `${backendBase.replace(/\/$/, '')}/api/chat/`
        : `/api/chat/`
      const token = authClient.getToken()
      
      const payload: any = { message: userMessage }
      if (conversationId) {
        payload.conversation_id = conversationId
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      })

      const contentType = response.headers.get('content-type') || ''
      const responseText = await response.text()
      if (!response.ok) {
        if (contentType.includes('application/json')) {
          const errorData = JSON.parse(responseText || '{}')
          throw new Error(errorData.error || `HTTP ${response.status}`)
        }
        throw new Error(responseText || `HTTP ${response.status}`)
      }

      const data =
        contentType.includes('application/json') && responseText
          ? JSON.parse(responseText)
          : { response: responseText }
      
      console.log('DEBUG: Backend response data:', data)
      if (data.conversation_id) {
        console.log('DEBUG: Setting conversationId to:', data.conversation_id)
        setConversationId(data.conversation_id)
      } else {
        console.warn('DEBUG: No conversation_id in response')
      }
      
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || data.message || 'No response from server',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMsg])
    } catch (err: any) {
      console.error('Chat error:', err)
      setError(err.message || 'Failed to send message')
      
      // Add error message to chat
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Error: ${err.message || 'Failed to send message'}`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMsg])
    } finally {
      setIsLoading(false)
    }
  }

  const clearMessages = () => {
    setMessages([])
    setError(null)
  }

  return {
    messages,
    sendMessage,
    isLoading,
    error,
    clearMessages,
  }
}
