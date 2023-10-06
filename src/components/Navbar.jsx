import React, { useState, useEffect } from 'react'
import { FiSettings } from 'react-icons/fi'
import { RiNotification3Line } from 'react-icons/ri'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import avatar4 from '../data/avatar4.jpg'
import { ThemeSettings, Notification, UserProfile } from '.'
import { useStateContext } from '../contexts/ContextProvider'


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

const Navbar = ({pageTitle, userImage}) => {
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

  const [showNotification, setShowNotification] = useState(false);

  const toggleNotification = () => {
    // Toggle the visibility of the notification
    setShowNotification(!showNotification);
  };
  
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
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 600,
        fontSize: '22px',
      }}
      className="font-semibold text-2xl mr-5 mt-4 pt-1"
    >
      {pageTitle}
    </p>
      </div>
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
