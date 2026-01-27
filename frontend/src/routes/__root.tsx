import { TanStackDevtools } from '@tanstack/react-devtools'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { AuthProvider } from '../context/AuthContext'

import Header from '../components/Header'
import { NotFound } from '../components/NotFound'

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
})

function RootLayout() {
  const showDevtools =
    import.meta.env.DEV && import.meta.env.VITE_ENABLE_DEVTOOLS === 'true'

  return (
    <AuthProvider>
      <Header />
      <Outlet />
      {showDevtools && (
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
      )}
    </AuthProvider>
  )
}
