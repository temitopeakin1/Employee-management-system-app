import React, { useState } from 'react'
import { MdOutlineCancel } from 'react-icons/md'
import Switch from '../components/Switch'
import { Button } from '.'
import { userProfileData } from '../data/dummy'

const UserProfile = () => {
  const [hasLogout, setHasLogout] = useState(
    userProfileData.some((item) => item.title === 'Logout'),
  )

  return (
    <div
      className={`nav-item absolute right-8 top-16 bg-white p-8 rounded-xl w-70 h-62 ${
        hasLogout ? 'border border-gray-400' : ''
      }`}
    >
      <Button
        icon={
          <MdOutlineCancel style={{ marginLeft: '50px', marginTop: '-40px' }} />
        }
        color="rgb(153, 171, 180)"
        size="2xl"
        borderRadius="50%"
      />
      <div className="items-center my-[-4px] -mx-4 border-b-1 pb-1">
        <p className="font-semibold -mt-4 font-satoshi text-16 dark:text-gray-200">
          lorem ipsum
        </p>
        <p className="font-copy text-sm font-bold dark:text-gray-200">
          Admin Account
        </p>
      </div>
      <div className="-ml-8 py-1 md:py-4">
        {userProfileData.map((item, index) => (
          <div
            key={index}
            className="flex p- hover:bg-light-gray text-14 ml-2 pr-4 cursor-pointer font-copy"
          >
            <button
              type="button"
              style={{ color: item.iconColor }}
              className="-mt-2 -ml-2 rounded-lg p-3 hover:bg-light-gray"
            >
              {item.icon}
            </button>
            <div className="pl-2">
              {item.title === 'Logout' && (
                <p
                  className="font-semibold dark:text-gray-200"
                  style={{ color: '#D02F44' }}
                >
                  {item.title}
                </p>
              )}
              {item.title !== 'Logout' && (
                <p className="font-semibold dark:text-gray-200">{item.title}</p>
              )}
            </div>
          </div>
        ))}
        <div className="md:items-center border-color ml-4 -mr-4 border-b-1"></div>
        <div className="flex md:items-center space-x-12 -ml-4 -mr-4 font-copy mt-2">
          <div className="font-bold font-copy text-12 dark:text-gray-600 mb-2 ml-8">
           Mode
          </div>
          <Switch />
        </div>
      </div>
    </div>
  )
}

export default UserProfile
