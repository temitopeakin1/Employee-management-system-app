import React, { useState, useEffect, useRef } from 'react'
import { chatData } from '../data/dummy'
import { useStateContext } from '../contexts/ContextProvider'

const Notification = () => {
  const { currentColor } = useStateContext()
  const [showNotification, setShowNotification] = useState(true)
  const notificationRef = useRef(null)

  const closeNotification = () => {
    setShowNotification(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        closeNotification()
      }
    }

    // Add event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside)

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    showNotification && (
      <div
        ref={notificationRef}
        className="nav-item absolute right-5 md:right-40 top-16 bg-white p-8 rounded-sm w-80"
      >
        <div className="flex justify-between items-center">
          <div className="flex">
            <p className="font-bold text-sm dark:text-gray-200">Notification</p>
          </div>
        </div>
        <p className="text-sm dark: text-gray-400 mt-1">
          You have notifications
        </p>
        <div className="mt-2 ">
          {chatData?.map((item, index) => (
            <div
              key={index}
              className="flex items-center leading-8 gap-4 border-b-1 border-color p-3"
            >
              <img
                className="rounded-full h-10 w-10"
                src={item.image}
                alt={item.message}
              />
              <div>
                <p className="font-semibold dark:text-gray-200">
                  {item.message}
                </p>
                <p className="text-gray-500 text-sm dark:text-gray-400">
                  {' '}
                  {item.desc}{' '}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  )
}

export default Notification
