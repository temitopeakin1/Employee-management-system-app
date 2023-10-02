import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Sidebar } from './components'
import LandingPage from './pages/LandingPage'
import Register from './pages/Register'
import Login from './pages/Login'
import { Dashboard, Calendar, Employees } from './pages'
import './App.css'
import { useStateContext } from './contexts/ContextProvider'

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode } = useStateContext()

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode')
    const currentThemeMode = localStorage.getItem('themeMode')
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor)
      setCurrentMode(currentThemeMode)
    }
  }, [setCurrentColor, setCurrentMode])

  return (
    <BrowserRouter>
      <AppContent currentMode={currentMode} />
    </BrowserRouter>
  )
}

const AppContent = ({ currentMode }) => {
  const location = useLocation()

  // Check if the current route is the landing page, register, or login
  const isLandingPage = location.pathname === '/'
  const isRegister = location.pathname === '/register'
  const isLogin = location.pathname === '/login'

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <div className="flex relative dark:bg-main-dark-bg">
        <div
          className="fixed right-4 bottom-4"
          style={{ zIndex: '1000' }}
        ></div>
        <div
          className={
            isLandingPage || isRegister || isLogin
              ? 'w-0 dark:bg-secondary-dark-bg'
              : 'w-72 fixed sidebar dark:bg-secondary-dark-bg bg-brown'
          }
        >
          {!isLandingPage && !isRegister && !isLogin && <Sidebar />}
        </div>
        <div
          className={
            isLandingPage || isRegister || isLogin
              ? 'bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2'
              : 'dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full'
          }
        >
          <div>
            <Routes>
              {/* Landing Page (default route) */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              {/* dashboard */}
              <Route path="/dashboard" element={<Dashboard />} />
              {/* pages */}
              <Route path="/employees" element={<Employees />} />

              {/* apps */}
              <Route path="/calendar" element={<Calendar />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
