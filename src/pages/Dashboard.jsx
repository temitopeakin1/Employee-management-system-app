import React, { useMemo, useState, useEffect } from 'react'
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
} from '@syncfusion/ej2-react-grids'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { dropdownData } from '../data/dummy'
import { useStateContext } from '../contexts/ContextProvider'
import DonutChart from '../components/Charts/DonutChart'
import BarChart from '../components/Charts/BarChart'
import Navbar from '../components/Navbar'
import { FiPhone } from 'react-icons/fi'
import Greeting from '../components/Greeting'
import red_icon from '../assets/red_icon.png'
import green_icon from '../assets/green_icon.png'
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns'

const DropDown = ({ currentMode }) => (
  <div className="w-28 px-4 -mt-2.5">
    <DropDownListComponent
      id="time"
      fields={{ text: 'Time', value: 'Id' }}
      style={{
        borderColor: 'transparent',
        color: currentMode === 'Dark' && 'white',
      }}
      value="1"
      dataSource={dropdownData}
      popupHeight="200px"
      popupWidth="120px"
    />
  </div>
)

const Dashboard = ({ Dashboard }) => {
  const { currentColor, currentMode } = useStateContext()
  const [averageSalary, setAverageSalary] = useState(0)
  // const [selectedDepartment, setSelectedDepartment] = useState('All Employees')
  const selectionsettings = { persistSelection: true }

  // Retrieve employee data from local storage using useMemo to
  const employeesData = useMemo(() => {
    const storedData = localStorage.getItem('employeesData')
    return storedData ? JSON.parse(storedData) : []
  }, [])

  // format currency
  const salaryFormatter = (averageSalary) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
    }).format(averageSalary)
  }

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

  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
  )

  // calculate the kpi's
  const targetTotalEmployees = 80
  const presentTotalEmployees = totalEmployees
  const totalEmployeesKPI = (presentTotalEmployees / targetTotalEmployees) * 100

  // filter the departments on the dashboard
  const departmentFilters = [
    'All Employees',
    'Marketing',
    'Accounting',
    'Human Resources',
    'IT Support',
    'Software Engineering',
  ]

  // Calculate the employee counts for each department
  const departmentCounts = {}
  employeesData.forEach((employee) => {
    const department = employee.department
    departmentCounts[department] = (departmentCounts[department] || 0) + 1
  })

  // Create labels and data arrays for the chart
  const labels = Object.keys(departmentCounts)
  const data = Object.values(departmentCounts)
  const chartColors = ['#FF6384', '#F08337', '#4BC0C0', '#FF0000', '#088F8F']

  const departmentNames = Object.keys(departmentCounts)
  const departmentData = departmentNames.map(
    (department) => departmentCounts[department],
  )

  // const departmentAbbreviations = {
  //   'Software Engineering': 'SWE',
  //   'Administrative': 'Admin',
  //   'Human Resources': 'HR',
  //   // Add more department names and their abbreviations as needed
  // };

  // Construct the dataset with dynamic data
  const dataset = {
    labels: departmentNames,
    data: departmentData,
    backgroundColor: chartColors.slice(0, departmentNames.length),
    hoverBackgroundColor: chartColors.slice(0, departmentNames.length),
  }
  // for the donught chart
  const chartData = {
    labels: departmentNames,
    datasets: [dataset],
  }
  // donought chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: 85,
    plugins: {
      legend: {
        display: false,
      },
      tooltips: {
        enabled: true, // Make sure tooltips are enabled
      },
    },
  }

  const barChartData = {
    labels: departmentNames,
    datasets: [
      {
        data: departmentData,
        backgroundColor: '#F08337',
        barThickness: 18,
      },
    ],
  }

  // bar chart logic (horizontal)
  const ybaroptions = {
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false,
      },
    },
  }

  //bar chart logic (vertical)
  const baroptions = {
    scales: {
      x: {
        title: {
          beginAtZero: true,
          display: false,
          text: 'Performance',
        },
      },
      y: {
        title: {
          display: false,
          text: 'Department',
        },

        ticks: {
          callback: (value, index) => {
            return value
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      bar: {
        backgroundColor: '#F08337',
      },
    },
  }

  return (
    <div className="justify-center">
      <Navbar pageTitle="Dashboard" />
      <div className="dark:text-gray-200 dark:bg-secondary-dark-bg ml-4 mr-4 mt-5 mb-10">
        <div className="justify-left">
          <p className="font-semibold text-2xl mb-10">{Dashboard}</p>
          <div className="font-semibold text-5xl ">
            <Greeting />
          </div>
          <p className="font-semibold text-title text-gray-500 text-14 mt-2">
            Here's what is going on at Hampshire Heights
          </p>
        </div>
      </div>
      <div className="-mt-5">
        <div className="flex flex-wrap lg:flex-nowrap gap-.5 justify-center ">
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-32 rounded-sm w-full lg:w-60 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold font-satoshi text-gray-500 text-sm pb-3">
                  Total Employees
                </p>
                <div className="flex">
                  <p className="text font-semibold">{totalEmployees}</p>
                  <img
                    src={red_icon}
                    alt="icon"
                    style={{
                      width: '15px',
                      height: '15px',
                      marginLeft: '150px',
                      marginTop: '5px',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-32 rounded-sm w-full lg:w-60 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold font-satoshi text-gray-500 text-sm pb-3">
                  Contract Employees
                </p>
                <div className="flex">
                  <p className="text font-semibold">{totalContractEmployees}</p>
                  <img
                    src={red_icon}
                    alt="icon"
                    style={{
                      width: '15px',
                      height: '15px',
                      marginLeft: '150px',
                      marginTop: '5px',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-32 rounded-sm w-full lg:w-60 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold font-satoshi text-gray-500 text-sm pb-3">
                  Avg. Salary
                </p>
                <div className="flex">
                  <p className="text font-semibold">{salaryFormatter(averageSalary)}</p>
                  <img
                    src={green_icon}
                    alt="icon"
                    style={{
                      width: '15px',
                      height: '15px',
                      marginLeft: '35px',
                      marginTop: '5px',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-32 rounded-sm w-full lg:w-60 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold font-satoshi text-gray-500 text-sm pb-3">
                  Kpi's
                </p>
                <div className="flex">
                  <p
                    className={`text font-semibold ${
                      totalEmployeesKPI >= 100
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {totalEmployeesKPI.toFixed(2)}%
                  </p>
                  <img
                    src={green_icon}
                    alt="icon"
                    style={{
                      width: '15px',
                      height: '15px',
                      marginLeft: '110px',
                      marginTop: '5px',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg ml-4 mr-4 p-4 rounded-sm h-auto">
            <p className="font-semibold text-l font-title -mt-1.5">
              Mancount Per Department
            </p>
            <div className="flex-grow border-t border-gray-200 -mx-4 my-1"></div>
            <div className="flex pt-4 pb-2">
              <div
                className="chart-container"
                style={{ width: '270px', height: '200px' }}
              >
                <DonutChart data={chartData} options={options} />
              </div>
              <div className="table-container mt-6 p-6">
                <table className="w-full">
                  <thead className="text-gray-500 text-12 font-title">
                    <tr className="header-cell">
                      <th>DEPARTMENT</th>
                      <th className="px-16">NEW</th>
                      <th className="px-8">TOTAL</th>
                    </tr>
                  </thead>
                  <div className="flex-grow border-t border-gray-400 -mx-64 -ml-1"></div>
                  <tbody className="font-semibold text-12 font-title ml-12 ">
                    {labels.map((label, index) => (
                      <tr key={index}>
                        <td className="department-cell">{label}</td>
                        <td></td>
                        <td></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 mt-3 gap-.2">
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg ml-4 mr-4 p-4 rounded-sm h-64 ">
            <div className="heading flex justify-between">
              <p className="font-semibold text-l font-title -mt-1.5">
                Average Performance
              </p>
              <DropDown currentMode={currentMode} />
            </div>
            <div className="flex-grow border-t border-gray-200 my-1 -mx-5"></div>
            <BarChart data={barChartData} options={ybaroptions} />
          </div>
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg ml-4 mr-4 p-4 rounded-sm h-64">
            <div className="heading flex justify-between">
              <p className="font-semibold text-l font-title -mt-1.5">
                Salaries
              </p>
              <DropDown currentMode={currentMode} />
            </div>
            <div className="flex-grow border-t border-gray-200 my-1 -mx-5"></div>
            <div className="flex">
              <BarChart data={barChartData} options={baroptions} />
              {/* Display Average Salary, Salary Paid, and Total Payout */}
              <div className="salaries-info ml-2 mt-2 py-1">
                <div className="font-semibold text-14 font-title ">
                  {averageSalary}
                </div>
                <div className="text-gray-500 text-12 font-title pb-2">
                  Avg. salary
                </div>
                <div className="font-semibold text-14 font-title">
                  1,000,000
                </div>
                <div className="text-gray-500 text-12 font-title pb-2">
                  Salary paid
                </div>
                <div className="font-semibold text-14 font-title">
                  1,000,000
                </div>
                <div className="text-gray-500 text-12 font-title">
                  Total payout
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="justify-center">
          <div className="h-300 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg mt-3 ml-4 mr-4 p-4 rounded-2xl">
            <div className="m-10 md:m-5 pt-5 p-2 md:p-2 bg-white rounded-3xl">
              <div className="pl-.5 pr-.5">
                {departmentFilters.map((department) => (
                  <button
                    key={department}
                    // onClick={() => setSelectedDepartment(department)}
                    className="px-2 -py-24 bg-transparent font-semibold text-gray-400 text-sm department-filter"
                  >
                    {department}
                  </button>
                ))}
              </div>
              <GridComponent
                dataSource={employeesData}
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
                    headerText="ID"
                    width="90"
                    template={(rowData) => (
                      <div>
                        <div className="text font-semibold">
                          {rowData.employeeId}
                        </div>
                      </div>
                    )}
                  />
                  <ColumnDirective
                    field="fullName"
                    headerText="Name"
                    width="220"
                    template={(rowData) => (
                      <div>
                        <div className="text font-semibold">
                          {rowData.firstName} {rowData.lastName}
                        </div>
                        <div className="font-copy font-semibold text-gray-400">
                          {rowData.email}
                        </div>
                      </div>
                    )}
                  />
                  <ColumnDirective
                    field="designation"
                    headerText="Position"
                    width="200"
                    template={(rowData) => (
                      <div>
                        <div className="font-copy font-semibold">
                          {rowData.designation}
                        </div>
                      </div>
                    )}
                  />
                  <ColumnDirective
                    field="department"
                    headerText="Department"
                    template={(rowData) => (
                      <div>
                        <div className="font-copy font-semibold">
                          {' '}
                          {/* Apply the same class here as in the "ID" column */}
                          {rowData.department}
                        </div>
                      </div>
                    )}
                  />
                  <ColumnDirective
                    field="phoneNumber"
                    headerText="Phone Number"
                    template={(rowData) => (
                      <div className="flex font-copy text-12 font-semibold items-center">
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
                    template={(rowData) => {
                      let statusClass = ''
                      if (rowData.empType === 'Contract') {
                        statusClass = 'contract-status'
                      } else if (rowData.empType === 'Intern') {
                        statusClass = 'intern-status'
                      } else if (rowData.empType === 'FullTime') {
                        statusClass = 'fulltime-status'
                      } else if (rowData.empType === 'PartTime') {
                        statusClass = 'parttime-status'
                      }
                      return (
                        <div className={statusClass}>{rowData.empType}</div>
                      )
                    }}
                  />
                </ColumnsDirective>
                <Inject services={[Page]} />
              </GridComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
