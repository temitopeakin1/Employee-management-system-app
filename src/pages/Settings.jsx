import React from 'react'
import Navbar from '../components/Navbar'

const Settings = ({ Settings }) => {
  return (
    <div className="justify-center">
    <Navbar
      pageTitle="Settings"
    />
    <div className="dark:text-gray-200 dark:bg-secondary-dark-bg ml-4 mr-4 mt-5 mb-10">
      <div className="justify-left">
        <p className="font-semibold text-2xl mb-10">{Settings}</p>
      </div>
    </div>
  </div>
  )
}

export default Settings