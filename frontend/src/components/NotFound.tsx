import { Link } from '@tanstack/react-router'

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-xl text-gray-500">Page not found</p>
      <Link
        to="/"
        className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
      >
        Go Home
      </Link>
    </div>
  )
}
