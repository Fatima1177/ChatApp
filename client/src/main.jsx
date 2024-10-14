import React from 'react'
import ReactDOM from 'react-dom/client'
import {routes} from './routes'
import {RouterProvider} from 'react-router-dom'
import './styles/reset.css'
import './styles/pages.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={routes}/>
)
