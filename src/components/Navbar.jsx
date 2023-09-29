import React, { useState, useEffect } from 'react'
import { FiSettings } from 'react-icons/fi'
import { RiNotification3Line } from 'react-icons/ri'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import avatar4 from '../data/avatar4.jpg'
// import { BsChatLeft } from "react-icons/bs";
import { ThemeSettings, Notification, UserProfile } from '.'
import { useStateContext } from '../contexts/ContextProvider'
import { AiOutlineMenu } from 'react-icons/ai'
// import Button from "./shared/Button";
import Employees from '../pages/Employees'

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-3xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
)

const Navbar = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext()

  const [isModalVisible, setModalVisible] = useState(false)

  const toggleModal = () => {
    setModalVisible(!isModalVisible)
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

  const handleActiveMenu = () => setActiveMenu(!activeMenu)

  return (
    <div className="flex justify-between p-2 md:ml-2 md:mr-6 relative">
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon=<AiOutlineMenu
          style={{ transform: 'scale(1.5)', paddingTop: '1px' }}
        />
      />
      <div className="flex">
        <NavButton
          title="Settings"
          dotColor="#000000"
          customFunc={() => handleClick('themeSettings')}
          color={currentColor}
          icon={<FiSettings />}
        />
        <NavButton
          title="Notification"
          dotColor="#000000"
          customFunc={() => handleClick('notification')}
          color={currentColor}
          icon={<RiNotification3Line />}
        />
        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick('userProfile')}
          >
            <img
              className="rounded-full w-10 h-10"
              src={avatar4}
              alt="user-profile"
            />
            <p>
              <span className="text-gray-800 text-14">Hello, </span>{' '}
              <span className="text-gray-800 text-14">Admin</span>
            </p>
            <MdKeyboardArrowDown className="text-gray-800 text-14" />
          </div>
        </TooltipComponent>

        {isClicked.themeSettings && <ThemeSettings />}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
        {isModalVisible && <Employees toggleModal={toggleModal} />}
      </div>
    </div>
  )
}

export default Navbar
