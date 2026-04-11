import { RouterProvider } from 'react-router-dom';
import './index.css'
import { router } from './router'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/>

)
