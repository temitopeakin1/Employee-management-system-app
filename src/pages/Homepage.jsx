import React from 'react'
import logoo from '../assets/logoo.png'
import { Link } from 'react-router-dom'
import subtract from '../assets/subtract.png'
import user from '../assets/user.png'
import { FaAngleRight } from 'react-icons/fa'



const Homepage = () => {
  
  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-black text-white p-10 flex items-center justify-center">
        <div className="pl-18">
          <img src={logoo} alt="Logo" style={{ height: '100px', width: '100px' }} />
          <p className="text-45 font-semibold mt-2 pr-50">
          <span className="gradient-text">Artificial Intelligence</span>
            <br />
            Solution for your
            <br />
            Business
          </p>
          <p className="text-sm mt-4">
            Dynasty Tech creates products that let people do things
            differently
          </p>
        </div>
      </div>
      <div className="flex-1 bg-white text-black p-10 flex items-center justify-center">
        <div className="text">
          <h2 className="text-2xl mb-4 font-satoshi font-semibold ml-4">Welcome to Dynasty</h2>
          <h2 className="text-2xl mb-4 font-satoshi font-semibold ml-4 -mt-4">Tech.</h2>
          <div>
            <Link to="/login"
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

export default Homepage
