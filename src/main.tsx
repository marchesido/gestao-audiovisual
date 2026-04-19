import { RouterProvider } from 'react-router-dom';
import './index.css'
import { router } from './router'
import { createRoot } from 'react-dom/client'

import { AuthProvider } from './contexts/AuthContext';

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
