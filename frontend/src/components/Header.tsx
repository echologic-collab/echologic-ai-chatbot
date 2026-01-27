import { Link } from '@tanstack/react-router'

import {
  Home,
  LogIn,
  LogOut,
  Menu,
  MessagesSquare,
  X
} from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import logoUrl from '../assets/logo.png'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className="p-4 flex items-center bg-gray-800 text-white shadow-lg">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
        <h1 className="ml-4 text-xl font-semibold">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logoUrl}
              alt="Echo Logic"
              className="h-10"
            />
            <span className="font-bold text-lg">Echo Logic AI</span>
          </Link>
        </h1>
      </header>

      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-gray-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Navigation</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
            }}
          >
            <Home size={20} />
            <span className="font-medium">Home</span>
          </Link>

          <AuthLink onClose={() => setIsOpen(false)} />

          <Link
            to="/chat"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2 text-green-400 hover:text-green-300"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-green-900/50 hover:bg-green-900/70 transition-colors mb-2 text-green-300',
            }}
          >
            <MessagesSquare size={20} />
            <span className="font-medium">Chat</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-700 bg-gray-800">
          <p className="text-xs text-gray-400 text-center">Echo Logic AI</p>
        </div>
      </aside>
    </>
  )
}

function AuthLink({ onClose }: { onClose: () => void }) {
  const { isAuthenticated, logout } = useAuth()
  
  if (isAuthenticated) {
      return (
           <button
              onClick={() => {
                logout()
                onClose()
              }}
              className="flex w-full items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2 text-red-400 hover:text-red-300"
            >
              <LogOut size={20} />
              <span className="font-medium">Sign Out</span>
            </button>
      )
  }

  return (
      <Link
          to="/login"
          onClick={onClose}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2 text-blue-400 hover:text-blue-300"
          activeProps={{
            className:
              'flex items-center gap-3 p-3 rounded-lg bg-blue-900/50 hover:bg-blue-900/70 transition-colors mb-2 text-blue-300',
          }}
        >
          <LogIn size={20} />
          <span className="font-medium">Sign In</span>
      </Link>
  )
}
