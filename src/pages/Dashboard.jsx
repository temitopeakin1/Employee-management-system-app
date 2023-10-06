import React, { useMemo, useState, useEffect } from 'react'
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
  Toolbar,
} from '@syncfusion/ej2-react-grids'
import Navbar from '../components/Navbar'
import { Pie } from '../components'
import { deptData } from '../data/dummy'
import { FiPhone } from 'react-icons/fi'
import Greeting from '../components/Greeting'

const Dashboard = ({ Dashboard }) => {
  const [averageSalary, setAverageSalary] = useState(0)
  const toolbarOptions = ['Search']
  const selectionsettings = { persistSelection: true }

  // Retrieve employee data from local storage using useMemo to
  const employeesData = useMemo(() => {
    const storedData = localStorage.getItem('employeesData')
    return storedData ? JSON.parse(storedData) : []
  }, [])

  // Calculate total employees and contract employees
  const totalEmployees = employeesData.length
  const totalContractEmployees = employeesData.filter(
    (employee) => employee.empType === 'Contract',
  ).length

  // Calculate average salary
  useEffect(() => {
    const totalSalary = employeesData.reduce((total, employee) => {
      const employeeSalary = parseFloat(employee.salary)
      if (!isNaN(employeeSalary)) {
        return total + employeeSalary
      }
      return total
    }, 0)

    const validEmployeesCount = employeesData.filter((employee) => {
      const employeeSalary = parseFloat(employee.salary)
      return !isNaN(employeeSalary)
    }).length

    if (validEmployeesCount > 0) {
      const avgSalary = totalSalary / validEmployeesCount
      setAverageSalary(avgSalary.toFixed(2)) // Convert to fixed decimal places if needed
    } else {
      // Handle the case when there are no valid salaries
      setAverageSalary(0)
    }
  }, [employeesData])

  // calculate the kpi's
  const targetTotalEmployees = 80
  const presentTotalEmployees = totalEmployees
  const totalEmployeesKPI = (presentTotalEmployees / targetTotalEmployees) * 100

  return (
    <div className="justify-center">
      <Navbar pageTitle="Dashboard" />
      <div className="dark:text-gray-200 dark:bg-secondary-dark-bg ml-4 mr-4 mt-5 mb-10">
        <div className="justify-left">
          <p className="font-semibold text-2xl mb-10">{Dashboard}</p>
          <div className="font-semibold text-5xl ">
            <Greeting />
          </div>
          <p className="font-semibold text-gray-400 text-sm mt-2">
            Here's what is going on at Hampshire Heights
          </p>
        </div>
      </div>
      <div className="-mt-5">
        <div className="flex flex-wrap lg:flex-nowrap gap-.5 justify-center ">
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-32 rounded-sm w-full lg:w-60 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-400 text-sm pb-3">
                  Total Employees
                </p>
                <p className="text font-semibold">{totalEmployees}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-32 rounded-sm w-full lg:w-60 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-400 text-sm pb-3">
                  Contract Employees
                </p>
                <p className="text font-semibold">{totalContractEmployees}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-32 rounded-sm w-full lg:w-60 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-400 text-sm pb-3">
                  Avg. Salary
                </p>
                <p className="text font-semibold">{averageSalary}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-32 rounded-sm w-full lg:w-60 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-400 text-sm pb-3">
                  Kpi's
                </p>
                <p
                  className={`text font-semibold ${
                    totalEmployeesKPI >= 100 ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {totalEmployeesKPI.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="flex-grow ml-100">
            <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg ml-4 mr-4 p-4 rounded-sm">
              <div className="flex justify-between">
                <p className="font-semibold text-l">Mancount Per Department</p>
              </div>
              <div className="ml-auto">
                <Pie
                  id="pie-chart"
                  data={deptData}
                  legendVisiblity={true}
                  height="200px"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 mt-3 gap-.2">
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg ml-4 mr-4 p-4 rounded-sm ">
            <p className="font-semibold text-l">Average Performance</p>
          </div>
          <div className="h-300 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg ml-4 mr-4 p-4 rounded-sm">
            <p className="font-semibold text-l">Salaries</p>
          </div>
        </div>
        <div className="h-300 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg mt-3 ml-4 mr-4 p-4 rounded-sm">
          <GridComponent
            dataSource={employeesData}
            enableHover={false}
            width="auto"
            allowPaging
            allowSorting
            allowSearching={true}
            pageSettings={{ pageCount: 5 }}
            selectionSettings={selectionsettings}
            toolbar={toolbarOptions}
            className="custom-grid"
          >
            <ColumnsDirective>
              <ColumnDirective
                field="id"
                headerText="ID"
                width="90"
                template={(rowData) => (
                  <div>
                    <div className="text font-semibold">{rowData.id}</div>
                  </div>
                )}
              />
              <ColumnDirective
                field="fullName"
                headerText="Name"
                width="150"
                template={(rowData) => (
                  <div>
                    <div className="text font-semibold">
                      {rowData.firstName} {rowData.lastName}
                    </div>
                    <div className="font-bold text-gray-400">
                      {rowData.email}
                    </div>
                  </div>
                )}
              />
              <ColumnDirective
                field="designation"
                headerText="Position"
                width="200"
              />
              <ColumnDirective field="department" headerText="Department" />
              <ColumnDirective
                field="phoneNumber"
                headerText="Phone Number"
                template={(rowData) => (
                  <div className="flex items-center">
                    <FiPhone className="phone-icon mr-2" />
                    {rowData.phoneNumber}
                  </div>
                )}
              />
              <ColumnDirective
                field="empType"
                headerText="Status"
                width="120"
                textAlign="left"
              />
            </ColumnsDirective>
            <Inject services={[Search, Page, Toolbar]} />
          </GridComponent>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
