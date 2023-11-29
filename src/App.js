import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Sidebar } from './components'
import Homepage from './pages/Homepage'
import Register from './pages/Register'
import Login from './pages/Login'
import Forgotpassword from './pages/Forgotpassword'
import { Dashboard, Calendar, Employees, Departments, Contracts, Conversations, Payroll, Payslip, Settings } from './pages'
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
  let location = useLocation()

  // Check if the current route is the home page, register, or login
  const isHomepage = location.pathname === '/'
  const isRegister = location.pathname === '/register'
  const isLogin = location.pathname === '/login'
  const isForgotpassword = location.pathname === '/forgotPassword'

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <div className="flex relative dark:bg-main-dark-bg">
        <div
          className="fixed right-4 bottom-4"
          style={{ zIndex: '1000' }}
        ></div>
        <div
          className={
            isHomepage || isRegister || isLogin || isForgotpassword
              ? 'w-0 dark:bg-secondary-dark-bg'
              : 'w-72 fixed sidebar dark:bg-secondary-dark-bg bg-brown'
          }
        >
          {!isHomepage && !isRegister && !isLogin && !isForgotpassword && <Sidebar />}
        </div>
        <div
          className={
            isHomepage || isRegister || isLogin || isForgotpassword
              ? 'bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2'
              : 'dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full'
          }
        >
          <div>
            <Routes>
              {/* HomePage (default route) */}
              <Route path='/' element={<Homepage />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/forgotPassword' element={<Forgotpassword />} />
             {/* pages */}
              <Route path='/dashboard' element={<Dashboard />} />     
              <Route path='/employees' element={<Employees />} />
              <Route path='/departments' element={<Departments />} />
              <Route path='/calendar' element={<Calendar />} />
              <Route path='/contracts' element={<Contracts />} />
              <Route path='/conversations' element={<Conversations />} />
              <Route path='/payroll' element={<Payroll />} />
              <Route path='/payslip' element={<Payslip />} />
              <Route path='/settings' element={<Settings />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
