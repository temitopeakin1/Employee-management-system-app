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
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Doughnut, Bar } from 'react-chartjs-2'
import Navbar from '../components/Navbar'
import { FiPhone } from 'react-icons/fi'
import Greeting from '../components/Greeting'
import red_icon from '../assets/red_icon.png'
import green_icon from '../assets/green_icon.png'

const Dashboard = ({ Dashboard }) => {
  const [averageSalary, setAverageSalary] = useState(0)
  const toolbarOptions = ['Search']
  // const [selectedDepartment, setSelectedDepartment] = useState('All Employees')
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
  const chartColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']

  const departmentNames = Object.keys(departmentCounts)
  const departmentData = departmentNames.map(
    (department) => departmentCounts[department],
  );

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
    },
  }

  const barChartData = {
    labels: departmentNames,
    datasets: [dataset],
  }

  //bar chart logic
  const barOptions = {
    indexAxis: 'y',
    scales: {
      x: {
        title: {
          beginAtZero: true,
          display: true,
          text: 'Performance',
        },
        
      },
      y: {
        title: {
          display: true,
          text: 'Department',
        },

        ticks: {
          callback: (value, index) => {
            return value;
          },
        },
      },
    },
    // plugins: {
    //   legend: {
    //     display: false,
    //   },
    // },
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
                  <p className="text font-semibold">{averageSalary}</p>
                  <img
                    src={green_icon}
                    alt="icon"
                    style={{
                      width: '15px',
                      height: '15px',
                      marginLeft: '90px',
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
            <p className="font-semibold text-l font-title">
              Mancount Per Department
            </p>
            <div className="flex-grow border-t border-gray-200 -mx-4 my-2"></div>
            <div className="flex pt-4 pb-2">
              <div
                className="chart-container"
                style={{ width: '270px', height: '200px' }}
              >
                <Doughnut data={chartData} options={options} />
              </div>
              <div className="table-container mt-6">
                <table className="w-full">
                  <thead className="text-gray-500 text-12 font-title px-20">
                    <tr>
                      <th className="header-cell">DEPARTMENT</th>
                      <th className="header-cell">NEW</th>
                      <th className="header-cell">TOTAL</th>
                    </tr>
                  </thead>
                  <div className="flex-grow border-t border-gray-200 -mx-4"></div>
                  <tbody className="font-semibold text-12 font-title ml-12 ">
                    {labels.map((label, index) => (
                      <tr key={index}>
                        <td>{label}</td>
                        <td>
                          {/* Replace this with the corresponding 'New' data */}
                        </td>
                        <td>
                          {/* Replace this with the corresponding 'Total' data */}
                        </td>
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
            <p className="font-semibold text-l font-title">
              Average Performance
            </p>
            <div className="flex-grow border-t border-gray-200 my-2 -mx-5"></div>
            <div
              className="chart-container"
              style={{ width: '400px', height: '320px' }}
            >
              <Bar data={barChartData} barOptions={barOptions} />
            </div>
          </div>
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg ml-4 mr-4 p-4 rounded-sm h-64">
            <p className="font-semibold text-l font-title">Salaries</p>
            <div className="flex-grow border-t border-gray-200 my-2 -mx-5"></div>
          </div>
        </div>
        <div className="justify-center">
          <div className="h-300 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg mt-3 ml-4 mr-4 p-4 rounded-sm">
            <div className="m-10 md:m-5 pt-5 p-2 md:p-2 bg-white rounded-xl">
              <div className="md:m-5 -mt-4 space-x-2">
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
                        <div className="text font-semibold">
                          {rowData.employeeId}
                        </div>
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
      </div>
    </div>
  )
}

export default Dashboard
