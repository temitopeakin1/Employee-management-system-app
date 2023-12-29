import React, { useState, useEffect, useMemo } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import print from '../assets/print.png'
import upload from '../assets/upload.png'
import { AiOutlineSearch } from 'react-icons/ai'
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
} from '@syncfusion/ej2-react-grids'
import { Circle } from 'rc-progress'
import { departmentFilters }from '../data/dummy'
import { supabase } from '../supabaseClient'

const Payroll = () => {
  const navigate = useNavigate()
  const selectionsettings = { persistSelection: true }
  const [searchQuery, setSearchQuery] = useState('')
  const [currentMonth, setCurrentMonth] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('All Employees')
  const [totalSalary, setTotalSalary] = useState('')
  const [selectedEmployee, setSelectedEmployee] = useState('')

  // retrieve employee data from local storage
  const employeesData = useMemo(() => {
    const storedData = localStorage.getItem('employeesData')
    console.log('employeesData:', storedData)
    return storedData ? JSON.parse(storedData) : []
  }, [])

  // logic for share report
  const shareReport = () => {
    console.log('click')
  }
// logic for print report
  const printReport = () => {
    console.log('click')
  }

  // format currency
  const salaryFormatter = (totalSalary) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
    }).format(totalSalary)
  }

  // function to generate slip
  const handleGenerateSlip = (rowData) => {
    console.log('Generating slip for rowData:', rowData.employeeId)
    console.log('Employee ID:', rowData.employeeId)
    setSelectedEmployee(rowData.employeeId)
    navigate('/Payslip', { state: { employeeId: rowData.employeeId } })
  }
  // kebab menu function
  const handleKebabMenuClick = () => {
    console.log('kebabmenu')
  }

  useEffect(() => {
    const date = new Date()
    date.setMonth(date.getMonth() - 1)
    setCurrentMonth(date.toLocaleString('default', { month: 'long' }))

    // to set the total salary => total Payroll
    let calculatedTotalSalary = employeesData.map((employee) => parseInt(employee.salary) || 0)
      .reduce((acc, salary) => acc + salary, 0)
    setTotalSalary(calculatedTotalSalary)
  }, [selectedDepartment, employeesData]);

  // setting next payment date
  const getNextPaymentDate = () => {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const month = currentDate.toLocaleString('default', { month: 'long' })
    const formattedDate = `01 ${month} ${currentYear}`
    return formattedDate
  }

  const fetchTotalSalary = async () => {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('salary')
        .eq('department', selectedDepartment)

      console.log('Data:', data)
      console.log('Error:', error)

      if (data && data.length > 0) {
        const totalSalary = data
          .map((employee) => parseFloat(employee.salary) || 0)
          .reduce((acc, salary) => acc + salary, 0)

        console.log('Total Salary:', totalSalary)
        setTotalSalary(totalSalary)
      } else {
        console.log('No data for the selected department.')
      }
    } catch (error) {
      console.error('Error fetching employee data:', error)
    }
  }

  // filter employee list
  const getFilteredData = () => {
    if (selectedDepartment === 'All Employees') {
      return employeesData?.filter(
        (employee) =>
          employee.firstName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    } else {
      return employeesData.filter(
        (employee) =>
          (employee.firstName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
            employee.lastName
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) &&
          employee.department === selectedDepartment,
      )
    }
  }

  const filteredData = getFilteredData()

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
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
      <div className="justify-center">
        <div className="m-10 md:m-5 pt-5 p-2 md:p-2 bg-white rounded-xl">
          <div className="flex-grow border border-gray-200 mx-8 my-1 md:m-5 p-4 md:p-8 bg-white rounded-sm h-auto">
            <div className="flex">
              <div className="-ml-2 roundprogress">
                <Circle
                  percent={100}
                  strokeWidth={8}
                  trailWidth={8}
                  strokeColor="#F08337"
                />
              </div>
              <div className="ml-4 justify-between">
                <div
                  className="font-semibold font-satoshi"
                  style={{ fontsize: '22px' }}
                >
                  Information
                </div>
                <h2
                  className="text mt-1 font-satoshi text-gray-400"
                  style={{ fontSize: '12px' }}
                >
                  <span style={{ color: '#F08337' }}>100% </span>
                  of payment has been made for the whole month of {currentMonth}
                </h2>
              </div>
            </div>
            <div className="ml-auto -mt-14 space-x-16 text-right justify-end flex">
              <div className="mt-2 font-satoshi text-center text-12">
                <span className="text-gray-600">TOTAL PAYROLL</span>
                <h2 className="text-dark font-bold text-sm">
                 {salaryFormatter(totalSalary)}
                </h2>
              </div>
              <div className="mt-2 font-satoshi text-center text-12">
                <span className="text-gray-600">NEXT PAYMENT</span>
                <h2 className="text-dark font-bold text-sm">
                  {getNextPaymentDate()}
                </h2>
              </div>
            </div>
          </div>
          <div className="justify-center">
            <div className="md:m-5 -mt-4 space-x-2">
              {departmentFilters.map((department) => (
                <button
                  key={department}
                  onClick={() => setSelectedDepartment(department)}
                  className="px-2 -ml-2 mt-2 -py-24 bg-transparent font-semibold text-gray-400 text-sm department-filter"
                >
                  {department}
                </button>
              ))}
            </div>
            {filteredData && filteredData.length > 0 && (
              <GridComponent
                dataSource={filteredData}
                enableHover={true}
                width="auto"
                allowPaging
                allowSorting
                pageSettings={{ pageCount: 5, pageSize: 11 }}
                selectionSettings={selectionsettings}
                className="custom-grid"
              >
                <ColumnsDirective>
                  <ColumnDirective
                    field="id"
                    width="90"
                    headerText="ID"
                    headerTemplate={() => (
                      <div className="text-gray-470 font-medium">ID</div>
                    )}
                    template={(rowData) => (
                      <div>
                        <div className="font-bold text-14">
                          {rowData.employeeId}
                        </div>
                      </div>
                    )}
                  />

                  <ColumnDirective
                    field="fullName"
                    width="150"
                    headerText="Name"
                    headerTemplate={() => (
                      <div className="text-gray-470 font-medium">Name</div>
                    )}
                    template={(rowData) => (
                      <div>
                        <div className="text-sm font-semibold">
                          {rowData.firstName} {rowData.lastName}
                        </div>
                        <div className="text-gray-300 text-sm">
                          {rowData.designation}
                        </div>
                      </div>
                    )}
                  />
                  <ColumnDirective
                    field="designation"
                    width="150"
                    headerText="Position"
                    headerTemplate={() => (
                      <div className="text-gray-470 font-medium">Position</div>
                    )}
                  />
                  <ColumnDirective
                    field="salary"
                    width="100"
                    headerText="Gross Pay"
                    headerTemplate={() => (
                      <div className="text-gray-470 font-medium">Gross Pay</div>
                    )}
                  />
                  <ColumnDirective
                    field="salary"
                    width="100"
                    headerText="Total"
                    headerTemplate={() => (
                      <div className="text-gray-470 font-medium">Total</div>
                    )}
                  />
                  <ColumnDirective
                    field="Payslip"
                    width="100"
                    headerText="Payslip"
                    headerTemplate={() => (
                      <div className="text-gray-470 font-medium">Payslip</div>
                    )}
                    template={(rowData) => (
                      <div className="flex flex-items justify-center">
                        <button
                          onClick={() => handleGenerateSlip(rowData)}
                          className="bg-orange-500 text-white text-12 font-thin px-4 pt-1 pb-1 rounded-md mt-2 md:mt-0"
                        >
                          Generate Slip
                        </button>
                      </div>
                    )}
                  />
                  <ColumnDirective
                    field="Payment status"
                    width="150"
                    headerText="Payment status"
                    headerTemplate={() => (
                      <div className="text-gray-470 font-medium">
                        Payment status
                      </div>
                    )}
                    template={(rowData) => (
                      <div className="flex flex-items justify-center">
                        <div className="bg-green-100 text-green-500 font-normal font-title font-semibold text-12 px-2 py-1 mb-1 rounded-sm md:mt-0">
                          Complete
                        </div>
                      </div>
                    )}
                  />
                  <ColumnDirective
                    field="kebabMenu"
                    headerText=""
                    width="50"
                    template={(rowData) => (
                      <div
                        className="kebab-menu-trigger font-bold text-gray-700"
                        onClick={(e) => handleKebabMenuClick(e, rowData)}
                      >
                        ⋮
                      </div>
                    )}
                  />
                </ColumnsDirective>
              </GridComponent>
            )}
            {(!filteredData || filteredData.length === 0) && (
              <p>No data found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payroll;
