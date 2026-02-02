import { Link } from '@tanstack/react-router'
import { LogIn } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import logoUrl from '../assets/logo.png'

export default function Header() {
  const { isAuthenticated } = useAuth()

  return (
    <header className="p-4 flex items-center justify-between bg-gray-800 text-white shadow-lg">
      <h1 className="text-xl font-semibold">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logoUrl}
            alt="Echo Logic"
            className="h-10"
          />
          <span className="font-bold text-lg">Echo Logic AI</span>
        </Link>
      </h1>

      {!isAuthenticated && (
        <Link
          to="/login"
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          <LogIn size={18} />
          <span className="text-sm font-medium">Login</span>
        </Link>
      )}
    </header>
  )
}
