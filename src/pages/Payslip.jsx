import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import print from '../assets/print.png'
import { supabase } from '../supabaseClient'
import { useLocation } from 'react-router-dom'
import { useNavigate} from "react-router-dom";

const Payslip = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const employeeId = location?.state?.employeeId
  const [salary, setSalary] = useState('')
  const [currentMonth, setCurrentMonth] = useState('')
  const [employeeSalary, setEmployeeSalary] = useState('')
  const [designation, setDesignation] = useState('')
  // const [employeeName, setEmployeeName] =  useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [fullName, setFullName] = useState('')
  const [department, setDepartment] = useState('')

  const downloadPayslip = () => {
    console.log('click')
  }

  useEffect(() => {
    const fetchEmployeeSalary = async () => {
      try {
        const { data, error } = await supabase
          .from('employees')
          .select(
            'employeeId, salary, designation',
            'firstName, lastName',
            'department',
          )
          .eq('employeeId', String(employeeId))
          .single({ headers: { apikey: process.env.REACT_APP_ANON_KEY } })

        console.log('Supabase data:', data)
        console.log('Supabase error:', error)

        if (data) {
          setEmployeeSalary(data.salary)
          setSalary(data.salary)
          setDesignation(data.designation)
          setFirstName(data.firstName)
          setLastName(data.lastName)
          setFullName(data.fullName)
          setDepartment(data.department)
        }
      } catch (error) {
        console.error('Unexpected error fetching employee salary:', error)
      }
    }

    // Call the fetchEmployeeSalary function when the component mounts
    console.log('Employee ID:', employeeId)
    fetchEmployeeSalary()

    // set the month on payslip
    const date = new Date()
    date.setMonth(date.getMonth() - 1)
    setCurrentMonth(date.toLocaleString('default', { month: 'long' }))
  }, [employeeId])

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const { data: employeeData } = await supabase
          .from('employees')
          .select('department')
          .eq('employeeId', String(employeeId))
          .single({ headers: { apikey: process.env.REACT_APP_ANON_KEY } })

        if (employeeData) {
          setDepartment(employeeData.department)
        }
      } catch (error) {
        console.error('Unexpected error fetching employee details:', error)
      }
    }

    fetchEmployeeDetails()
  }, [employeeId])

  // format the year
  const getYear = () => {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    return currentYear
  }

  // format currency
  const salaryFormatter = (salary) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
    }).format(salary)
  }

  const employeeName = () => {
    const fullName = `${firstName || ''} ${lastName || ''}`
    return fullName.trim()
  }

  const handlePrevPage = () => {}
  return (
    <div className="justify-center text-center">
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
              Payslip
            </p>
            <button
              onClick={downloadPayslip}
              className="bg-orange-500 text-white font-bold px-3 pt-1 pb-1 rounded-sm md:-mt-1"
              style={{
                fontSize: '14px',
                marginLeft: '600px',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '50px',
                // padding: '0.3rem 1.5rem',
              }}
            >
              <img src={print} alt="Upload" className="mr-2" />
              Download Payslip
            </button>
          </div>
        }
      />
      <div className="justify-center">
        <div className="m-10 md:m-5 pt-5 p-2 md:p-2 bg-white rounded-xl">
          <h2 className="mt-4 text-lg font-satoshi font-bold underline">
            Payment for the Month of {currentMonth}
          </h2>
          <div className="flex flex-col">
            <div className="mt-4 px-4 text-left">
              <div className="text-gray-500 font-title">
                Company name and address
              </div>
              <div className="font-title font-bold text-lg mt-48 -mb-12">
                Earnings
              </div>
            </div>
            <div className="px-4 -mt-52 text-right">
              <div className="font-bold mt-1 font-title">Payslip</div>
              <div className="text-gray-500 font-title text-sm mt-4 -mb-8">
                Salary Month: {currentMonth} {getYear()}
              </div>
              <div className="ml-48 pr-8 pb-4 mt-16 text-center">
                <div className="pl-8 ml-2 text-gray-500 font-title text-md">
                  Employee Name: {employeeName()}
                </div>
                <div className="text-gray-500 font-title text-md mt-4 ml-36">
                  Designation: {designation}
                </div>
                <div className="text-gray-500 font-title text-md mt-4 mb-2 ml-40">
                  Department: {department}
                </div>
                <div className="font-title font-bold text-lg mt-4 -mb-8">
                  Deductions
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto my-8 p-4 flex items-center justify-center space-x-16">
            <table className="w-full bg-white border border-gray-300">
              <tbody>
                {/* Row 1 */}
                <tr>
                  <td className="text-gray-600 px-2 text-left border-b font-satoshi">
                    Basic salary
                  </td>
                  <td className="py-2 px-4 border-b font-bold font-satoshi">
                    {salaryFormatter(salary)}
                  </td>
                </tr>
                {/* Row 2 */}
                <tr>
                  <td className="text-gray-600 px-2 text-left border-b font-satoshi">
                    House Rent Allowance(HRA)
                  </td>
                  <td className="py-2 px-4 border-b font-bold font-satoshi">
                    0
                  </td>
                </tr>
                {/* Row 3 */}
                <tr>
                  <td className="text-gray-600 px-2 text-left border-b font-satoshi">
                    Conveyance
                  </td>
                  <td className="py-2 px-4 border-b font-bold font-satoshi">
                    0
                  </td>
                </tr>
                {/* Row 4 */}
                <tr>
                  <td className="text-gray-600 px-2 text-left border-b font-satoshi">
                    Other Allowances
                  </td>
                  <td className="py-2 px-4 border-b font-bold font-satoshi">
                    0
                  </td>
                </tr>
                <tr>
                  <td className="text-gray-600 px-2 text-left border-b font-satoshi">
                    Total Earnings
                  </td>
                  <td className="py-2 px-4 border-b font-bold font-satoshi">
                    {salaryFormatter(salary)}
                  </td>
                </tr>
              </tbody>
            </table>

            <table
              className="bg-white border border-gray-300"
              style={{ width: '100%' }}
            >
              <tbody>
                {/* Row 1 */}
                <tr>
                  <td className="text-gray-600 px-2 text-left border-b font-satoshi">
                    Tax Deducted at Source(T.D.S)
                  </td>
                  <td className="py-2 px-4 border-b font-bold font-satoshi">
                    NGN0
                  </td>
                </tr>
                {/* Row 2 */}
                <tr>
                  <td className="text-gray-600 px-2 text-left border-b font-satoshi">
                    Provident Fund
                  </td>
                  <td className="py-2 px-4 font-bold font-satoshi">NGN0</td>
                </tr>
                {/* Row 3 */}
                <tr>
                  <td className="text-gray-600 px-2 text-left border-b font-satoshi">
                    ESI
                  </td>
                  <td className="py-2 px-4 border-b font-bold font-satoshi">
                    NGN0
                  </td>
                </tr>
                {/* Row 4 */}
                <tr>
                  <td className="text-gray-600 px-2 text-left border-b font-satoshi">
                    Loan
                  </td>
                  <td className="py-2 px-4 border-b font-bold font-satoshi">
                    NGN0
                  </td>
                </tr>
                <tr>
                  <td className="text-gray-600 px-2 text-left border-b font-satoshi">
                    Total Deduction
                  </td>
                  <td className="py-2 px-4 border-b font-bold font-satoshi">
                    NGN0
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-2 px-2 font-title font-bold text-lg text-left">
            Net Salary:{salaryFormatter(salary)}
          </div>
        </div>
      </div>
      <button
        onClick={() => navigate(-1)} className="mt-4 mb-8 px-36 pt-2 pb-2 font-satoshi font-normal" style={{
          borderRadius: '14px',
          fontSize: '16px'
        }} >Go Back</button>
    </div>
  )
}

export default Payslip
