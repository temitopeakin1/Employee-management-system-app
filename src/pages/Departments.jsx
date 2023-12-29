import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import round from '../assets/round.png'
import download from '../assets/download.png'

import { BsPeopleFill } from 'react-icons/bs'
import { supabase } from '../supabaseClient'
import { deptFilters } from '../data/dummy'

const Department = ({ Department }) => {
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [totalInDept, setTotalInDept] = useState('')
  const [newEmployee, setNewEmployee] = useState(0)

  // function for the click report
  const clickReport = () => {
    console.log('click')
  }

  useEffect(() => {
    fetchEmployeeData()
  }, [selectedDepartment])

  // fetch data from supabase Database
  const fetchEmployeeData = async () => {
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .eq('department', selectedDepartment)

    if (error) {
      console.error('Error fetching employee data:', error)
    } else {
      // Use the data to calculate the total employees in the selected department
      const totalEmployees = data ? data.length : 0
      setTotalInDept(totalEmployees);
    }
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
              Department
            </p>
            <button
              onClick={clickReport}
              className="bg-orange-500 text-white font-bold px-4 pt-1 pb-1 rounded mt-2 md:mt-0"
              style={{
                fontSize: '14px',
                marginLeft: '550px',
                borderRadius: '50px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <img src={download} alt="Download" className="mr-2" />
              Company Report
            </button>
          </div>
        }
      />
      <div className="justify center">
        <div className="m-10 md:m-5 pt-5 p-2 md:p-2 bg-white rounded-xl">
          <div className="md:m-5 -mt-4 space-x-2">
            {deptFilters.map((department) => (
              <button
                key={department}
                onClick={() => setSelectedDepartment(department)}
                className="px-8 -ml-2.5 -py-24 pl-4 pt-2 bg-transparent font-semibold text-gray-600 text-sm department-filter"
              >
                {department}
              </button>
            ))}
          </div>
          <div className="flex-grow border border-gray-200 mx-8 my-1 md:m-5 p-4 md:p-8 bg-white rounded-sm h-auto">
            <div className="flex justify-between">
              <img src={round} alt="round" className="ml-2 mt-1.2" />
              <div className="flex-container -ml-32">
                <h2 className="-mt-4 pl-8 pt-4 font-copy font-bold text-lg">
                  {selectedDepartment}
                </h2>
                <div className="flex mt-2 ml-8">
                  <BsPeopleFill />
                  <h2 className="ml-2 -mt-.9 text-sm text-gray-500">
                    {totalInDept} Total employees in this department{' '}
                  </h2>
                </div>
              </div>
              <div className="mr-16">
                <h2 className="text-12 mb-4">NEW EMPLOYEE</h2>
                <h2 className="text-12">AVG.SALARY</h2>
              </div>
              <div className="mr-20">
                <h2 className="text-12 mb-4">AVG. OVERTIME</h2>
                <h2 className="text-12">TEAM KPI'S</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Department
