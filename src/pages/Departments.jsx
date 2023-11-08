import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import person from '../assets/person.png'
import round from '../assets/round.png'
import download from '../assets/download.png'
import { supabase } from '../supabaseClient'

const Department = ({ Department }) => {
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [totalInDept, setTotalInDept] = useState(0)
  const [newEmployee, setNewEmployee] = useState(0)

  // function for the click report
  const clickReport = () => {
    console.log('click')
  }

  const departmentFilters = [
    'Marketing',
    'Accounting',
    'Human Resources',
    'IT Support',
    'Software Engineering',
  ]

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
      setTotalInDept(totalEmployees)
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
            ><img src={download} alt='Download' className='mr-2'/>
              Company Report
            </button>
          </div>
        }
      />
      <div className="justify center">
        <div className="m-10 md:m-5 pt-5 p-2 md:p-2 bg-white rounded-xl">
          <div className="md:m-5 -mt-4 space-x-2">
            {departmentFilters.map((department) => (
              <button
                key={department}
                onClick={() => setSelectedDepartment(department)}
                className="px-1 -ml-2 -py-24 pl-4 pt-2 bg-transparent font-semibold text-gray-400 text-sm department-filter"
              >
                {department}
              </button>
            ))}
          </div>
          <div className="flex-grow border border-gray-200 mx-8 my-1 md:m-5 p-4 md:p-8 bg-white rounded-sm h-auto">
            <div className="flex">
              <img src={round} alt="round" className="ml-2 mt-1.2" />
              <div className="flex-container -ml-2">
                <h2 className="-mt-4 pl-8 pt-4 font-copy font-bold text-lg">
                  {selectedDepartment}
                </h2>
                <div className="flex -mt-2">
                  <img src={person} alt="Person" className="ml-8 mt-4" />
                  <h2
                    className="ml-2 text-sm text-gray-400"
                    style={{ marginTop: '10px' }}
                  >
                    {totalInDept} Total employees in this department{' '}
                  </h2>
                </div>
              </div>
              <div className="flex">
                <h2 className="ml-10">NEW EMPLOYEE</h2>
                <h2 className="ml-10">AVG.SALARY</h2>
                <h2 className="ml-15">AVG. OVERTIME</h2>
                <h2 className="ml-15">TEAM KPI'S</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Department
