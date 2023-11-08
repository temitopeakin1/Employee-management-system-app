import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import print from '../assets/print.png'
import upload from '../assets/upload.png'
import { AiOutlineSearch } from 'react-icons/ai'

const Payroll = ({ Payroll }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const shareReport = () => {
    console.log('click')
  }

  const printReport = () => {
    console.log('click')
  }

  return (
    <div className="justify-center">
      <Navbar
        pageTitle={
          <div className="flex flex-col items-center md:flex-row md:items-center">
            <p
              style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontWeight: '600',
                fontSize: '22px',
              }}
              className="font-bold text-2xl md:mr-5 -mt-6 md:-mt-4 pt-1"
            >
              Payroll
            </p>
            <div className="search-input-container">
              <input
                type="text"
                placeholder='Search...'
                value={searchQuery}
                onChanges={(e) => setSearchQuery(e.target.value)}
                className="text-sm mb-3 ml-4 py-1 pl-8 pr-40 rounded focus:outline-none"
              />
              <div className="search-icon">
                <AiOutlineSearch size={22} className="text-gray-300" />
              </div>
            </div>
            <button
              onClick={shareReport}
              className="bg-white font-bold px-4 pt-1 pb-1 rounded-sm mt-2 md:mt-0"
              style={{
                fontSize: '14px',
                marginLeft: '100px',
                display: 'flex',
                alignItems: 'center',
                border: '1px solid orange',
                borderRadius: '10px',
                color: 'orange',
              }}
            >
              <img src={upload} alt="Upload" className="mr-4" />
              Share Report
            </button>
            <button
              onClick={printReport}
              className="bg-orange-500 text-white font-bold px-4 pt-1 pb-1 rounded-sm mt-2 md:mt-0"
              style={{
                fontSize: '14px',
                marginLeft: '10px',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '10px',
              }}
            >
              <img src={print} alt="Print" className="mr-4" />
              Print Report
            </button>
          </div>
        }
      />
    </div>
  )
}

export default Payroll
