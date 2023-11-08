import React, { useState, useEffect } from 'react'
import { FiSettings } from 'react-icons/fi'
import { RiNotification3Line } from 'react-icons/ri'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import avatar4 from '../data/avatar4.jpg'
import { ThemeSettings, Notification, UserProfile } from '.'
import { useStateContext } from '../contexts/ContextProvider'
import { Link } from 'react-router-dom'

const NavButton = ({ title, customFunc, icon, color }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-3xl rounded-full p-3 hover:bg-light-gray"
    >
      <div className="darker-icon bold-icon">{icon}</div>
    </button>
  </TooltipComponent>
)

const Navbar = ({
  pageTitle,
  userImage,
  showBreadcrumbs,
  breadcrumbs,
  showReportButton,
  clickReport,
}) => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentColor,
    // activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext()

  const [showNotification, setShowNotification] = useState(false)

  const toggleNotification = () => {
    // Toggle the visibility of the notification
    setShowNotification(!showNotification)
  }

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth)
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [setScreenSize])

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode')
    const currentThemeMode = localStorage.getItem('themeMode')
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor)
      setCurrentMode(currentThemeMode)
    }
  }, [setCurrentColor, setCurrentMode])

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false)
    } else {
      setActiveMenu(true)
    }
  }, [screenSize, setActiveMenu])

  return (
    <div className="bg-white w-full flex justify-between p-1 px-4 py-4md:ml-2 md:mr-6 relative">
      <div className="flex">
        <p
          style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontWeight: '600',
            fontSize: '22px',
          }}
          className="font-bold text-2xl mr-5 mt-3 pt-1"
        >
          {pageTitle}
        </p>
      </div>
      {/* conditional rendering for breadcrumbs button*/}
      <div className="breadcrumb-navigation mt-12 -ml-52 px-1 py-1">
        {showBreadcrumbs &&
          breadcrumbs.map((breadcrumb, index) => (
            <span key={index}>
              {breadcrumb.link ? (
                <Link
                  to={breadcrumb.link}
                  className="text-gray-800 font-title font-semibold"
                >
                  {breadcrumb.label}
                </Link>
              ) : (
                <span className="text-gray-800 font-title font-semibold">
                  {breadcrumb.label}
                </span>
              )}
              {index < breadcrumbs.length - 1 && (
                <span className="breadcrumb-divider px-2 text-gray-800 font-semibold">
                  {' > '}
                </span>
              )}
            </span>
          ))}
      </div>

      {/* conditional rendering for report button*/}
      {showReportButton && (
        <button
          onClick={clickReport}
          className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-1 rounded-md 0mr-96"
          style={{ marginTop: '-2px', borderRadius: "50px" , paddingTop: ".002px", paddingBottom: "1px"}}
        >
          Company Report
        </button>
      )}
      {/* conditional rendering for employees button*/}

      <div className="flex ml-auto mt-3">
        <NavButton
          title="Settings"
          customFunc={() => handleClick('')}
          color={currentColor}
          icon={<FiSettings />}
        />
        <NavButton
          title="Notification"
          customFunc={toggleNotification}
          color={currentColor}
          icon={<RiNotification3Line />}
        />

        <TooltipComponent content="Profile">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick('userProfile')}
          >
            {userImage ? (
              <img
                className="rounded-full w-8 h-8"
                src={userImage}
                alt="user-profile"
              />
            ) : (
              <img
                className="rounded-full w-8 h-8"
                src={avatar4}
                alt="user-profile"
              />
            )}
            <MdKeyboardArrowDown className="text-gray-800 text-sm" />
          </div>
        </TooltipComponent>

        {isClicked.themeSettings && <ThemeSettings />}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile userImage={userImage} />}
        {showNotification && <Notification />}
        {isClicked.notification && <Notification />}
      </div>
    </div>
  )
}

export default Navbar
