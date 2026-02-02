const TOKEN_STORAGE_KEY = 'echo_logic_token'

export interface Token {
  access_token: string
  token_type: string
}

export interface TokenData {
  email?: string | null
}

export interface User {
  id: number
  uuid: string
  created_at: string
  updated_at: string
  name?: string | null
  email: string
}

const getApiBase = () => {
  const raw = import.meta.env.VITE_BACKEND_URL
  if (!raw) return ''
  return raw.endsWith('/') ? raw.slice(0, -1) : raw
}

const buildUrl = (path: string) => {
  const base = getApiBase()
  return base ? `${base}${path}` : path
}

const readToken = () => {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem(TOKEN_STORAGE_KEY)
}

const writeToken = (token: string) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(TOKEN_STORAGE_KEY, token)
}

const clearToken = () => {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(TOKEN_STORAGE_KEY)
}

const parseJson = (text: string) => {
  return text ? JSON.parse(text) : {}
}

const request = async (path: string, init?: RequestInit) => {
  const response = await fetch(buildUrl(path), init)
  const contentType = response.headers.get('content-type') || ''
  const text = await response.text()

  if (!response.ok) {
    if (contentType.includes('application/json')) {
      const data = parseJson(text)
      throw new Error(data?.detail?.[0]?.msg || data?.error || `HTTP ${response.status}`)
    }
    throw new Error(text || `HTTP ${response.status}`)
  }

  if (contentType.includes('application/json')) {
    return parseJson(text)
  }
  return text
}

const withAuth = (init?: RequestInit): RequestInit => {
  const token = readToken()
  if (!token) return init || {}
  return {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  }
}

export const authClient = {
  getToken: readToken,
  setToken: writeToken,
  clearToken,
  async login(email: string, password: string) {
    const body = new URLSearchParams({
      username: email,
      password,
    })
    const data = (await request('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })) as Token

    if (data?.access_token) {
      writeToken(data.access_token)
    }
    return data
  },
  async register(payload: { name?: string; email: string; password: string }) {
    return (await request('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })) as User
  },
  async verify() {
    return (await request('/api/auth/verify', withAuth())) as TokenData
  },
  async getMe() {
    return (await request('/api/users/me', withAuth())) as User
  },
  async logout() {
    clearToken()
  },
}
