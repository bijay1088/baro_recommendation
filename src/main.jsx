import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home.jsx'
import BaroEditor from './pages/Baro_editor.jsx'


const router = createBrowserRouter([
  {
    path: "/baro_recommendation",
    element: <App />,
    children: [
      {
        path: "/baro_recommendation",
        element: <Home />,
      },
      {
        path: "/baro_recommendation/editor",
        element: <BaroEditor />,
      }
    
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
