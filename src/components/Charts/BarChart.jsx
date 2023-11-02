import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'

const BarChart = ({ data, options }) => {
  ChartJS.register(
    BarElement, Tooltip, Legend, LinearScale, CategoryScale
  )

  return (
    <div
      className="chart-container"
      style={{ width: '400px', height: '320px' }}
    >
      <Bar data={data} options={options} />
    </div>
  )
}

export default BarChart;
