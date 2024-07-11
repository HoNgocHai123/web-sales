import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Admin from './components/Admin.jsx';
const router = createBrowserRouter([
  {
    path:'/home',
    element:<Admin></Admin>
  },
  {
    path:"/homepage",
    element:<App></App>
  }
]); 
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>,
)
