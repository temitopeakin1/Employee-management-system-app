import React, { useMemo } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import '../../App.css'

const DonutChart = ({ data, options }) => {
  const employeesData = useMemo(() => {
    const storedData = localStorage.getItem('employeesData')
    return storedData ? JSON.parse(storedData) : []
  }, [])

  const totalEmployees = useMemo(() => {
    return employeesData.length
  }, [employeesData])

  ChartJS.register(ArcElement, Tooltip, Legend)

  return (
    <div
      className="donot-chart-container relative w-72 h-56"
      style={{ width: '270px', height: '200px' }}
    >
   
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-2xl font-bold font-title">{totalEmployees}</div>
        <div className="text-sm font-title font-bold -mt-1">Total Employees</div>
      </div>
      <Doughnut data={data} options={options} totalEmployees={totalEmployees} />
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
      </div>
    </div>
  )
}

export default DonutChart
