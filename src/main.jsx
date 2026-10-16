import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import { StoreProvider } from './context/StoreContext'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode><MotionConfig reducedMotion="user"><BrowserRouter><StoreProvider><Layout><Home /></Layout></StoreProvider></BrowserRouter></MotionConfig></React.StrictMode>
)