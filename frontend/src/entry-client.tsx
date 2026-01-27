import { RouterProvider } from '@tanstack/react-router'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { getRouter } from './router'

const router = getRouter()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
