import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Sidebar } from './components'
import Homepage from './pages/Homepage'
import Register from './pages/Register'
import Login from './pages/Login'
import Recoverpassword from './pages/Recoverpassword'
import Forgotpassword from './pages/Forgotpassword'
import Verifypassword from './pages/Verifypassword'
import {
  Dashboard,
  Calendar,
  Employees,
  Departments,
  Contracts,
  Conversations,
  Payroll,
  Payslip,
  Settings,
} from './pages'
import './App.css'
import { useStateContext } from './contexts/ContextProvider'

const App = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    themeSettings,
    setThemeSettings,
  } = useStateContext()

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode')
    const currentThemeMode = localStorage.getItem('themeMode')
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor)
      setCurrentMode(currentThemeMode)
    }
  }, [setCurrentColor, setCurrentMode])

  const toggleTheme = () => {
    setThemeSettings((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
  }

  return (
    <BrowserRouter>
      <AppContent currentMode={currentMode} toggleTheme={toggleTheme} />
    </BrowserRouter>
  )
}

const AppContent = ({ currentMode, toggleTheme }) => {
  let location = useLocation()

  // Check if the current route is the home page, register, or login
  const isHomepage = location.pathname === '/'
  const isRegister = location.pathname === '/register'
  const isLogin = location.pathname === '/login'
  const isForgotpassword = location.pathname === '/forgotPassword'
  const isRecoverpassword = location.pathname === '/recoverPassword'
  const isVerifypassword = location.pathname === '/verifyPassword'

  return (
    <div className={currentMode === 'dark' ? 'dark' : ''}>
      <div className="flex relative dark:bg-main-dark-bg">
        <div
          className="fixed right-4 bottom-4"
          style={{ zIndex: '1000' }}
        ></div>
        <div
          className={
            isHomepage ||
            isRegister ||
            isLogin ||
            isForgotpassword ||
            isRecoverpassword ||
            isVerifypassword
              ? 'w-0 dark:bg-secondary-dark-bg'
              : 'w-72 fixed sidebar dark:bg-secondary-dark-bg bg-brown'
          }
        >
          {!isHomepage &&
            !isRegister &&
            !isLogin &&
            !isForgotpassword &&
            !isRecoverpassword &&
            !isVerifypassword && <Sidebar />}
        </div>
        <div
          className={
            isHomepage ||
            isRegister ||
            isLogin ||
            isForgotpassword ||
            isRecoverpassword ||
            isVerifypassword
              ? 'bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2'
              : 'dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full'
          }
        >
          <div>
            <Routes>
              {/* HomePage (default route) */}
              <Route path="/" element={<Homepage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgotPassword" element={<Forgotpassword />} />
              <Route path="/recoverPassword" element={<Recoverpassword />} />
              <Route path="/verifyPassword" element={<Verifypassword />} />
              {/* pages */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/contracts" element={<Contracts />} />
              <Route path="/conversations" element={<Conversations />} />
              <Route path="/payroll" element={<Payroll />} />
              <Route path="/payslip" element={<Payslip />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
