import React from 'react'
import Navbar from '../components/Navbar'

const Tasks = () => {
  return (
    <div>
      <div className="justify-center">
        <Navbar pageTitle="Tasks" />
        <div className="dark:text-gray-200 dark:bg-secondary-dark-bg ml-4 mr-4 mt-5 mb-10">
          <div className="justify-left">
            <p className="font-semibold text-2xl mb-10">{Tasks}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tasks;
