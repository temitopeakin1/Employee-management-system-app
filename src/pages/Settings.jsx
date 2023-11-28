import React from 'react'
import Navbar from '../components/Navbar'

const Settings = ({ Settings }) => {
  return (
    <div className="justify-center">
      <Navbar pageTitle="Settings" />
      <div className="dark:text-gray-200 dark:bg-secondary-dark-bg ml-4 mr-4 mt-5 mb-10">
        <div className="justify-left">
          <p className="font-semibold text-2xl mb-10">{Settings}</p>
        </div>
      </div>
      <div className="flex">
        <div className="container-left text-center">
          <div
            className="mt-2 -ml-20 font-satoshi"
            style={{ fontSize: '26px' }}
          >
            Settings
          </div>
          <div className="mt-2 ml-16 text-gray-500 font-title">
            Update and manage your account
          </div>
          <ul className="items-center justify-center">
            <li className="ml-8 pb-6 pt-6 font-title font-bold text-14">Edit Profile</li>
            <li className="ml-8 pb-6 font-title font-bold text-14">Account Settings</li>
            <li className="ml-8 pb-6 font-title font-bold text-14">Notifications</li>
            <li className="ml-8 pb-6 font-title font-bold text-14">Help Desk</li>
            <li className="ml-8 pb-6 font-title font-bold text-14">Integrations</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Settings
