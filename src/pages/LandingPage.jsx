import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import subtract from '../assets/subtract.png'
import user from '../assets/user.png'
import { FaAngleRight } from 'react-icons/fa'


const LandingPage = () => {
  
  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-black text-white p-10 flex items-center justify-center">
        <div className="pl-18">
          <img src={logo} alt="Logo" style={{ height: '35px' }} />
          <p className="text-lg font-semibold mt-4 pr-72">
            Artificial Intelligence
            <br />
            Solution for your
            <br />
            business
          </p>
          <p className="text-sm mt-8">
            Hampshire Heights creates products that let people do things
            differently
          </p>
        </div>
      </div>
      <div className="flex-1 bg-white text-black p-10 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Welcome to Hampshire Heights</h2>
          <div>
            <Link to="/register"
              className="flex items-center text-12 font-bold py-2 px-4 rounded"
            >
              <img src={subtract} alt="Subtract" className="w-6 h-6 mr-6" />
              Continue as an Administrator
              <FaAngleRight className="w-36 mr-6"/>
            </Link>
            <Link to="/employee-login"
              className="flex items-center text-12 font-bold py-2 px-4 rounded"
            >
              <img src={user} alt="User" className="w-6 h-6 mr-6" />
              Continue as an Employee
              <FaAngleRight className="w-48 mr-6" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
