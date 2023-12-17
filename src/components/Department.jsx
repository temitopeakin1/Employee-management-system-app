import React from 'react'
import { departmentFilters } from '../data/dummy'

const Department = () => {
  return (
    <div className="pl-.5 pr-.5">
    {departmentFilters.map((department) => (
      <button
        key={department}
        // onClick={() => setSelectedDepartment(department)}
        className="px-2 -py-24 bg-transparent font-semibold text-gray-600 text-sm department-filter"
      >
        {department}
      </button>
    ))}
  </div>
  )
}

export default Department