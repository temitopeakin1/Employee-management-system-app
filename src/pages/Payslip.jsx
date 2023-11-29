import { useState, useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import print from '../assets/print.png'
import { supabase } from '../supabaseClient'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'


const Payslip = () => {
  const navigate = useNavigate()
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
  const [payslipNumber, setPaySlipNumber] = useState()
  const [loader, setLoader] = useState(false)


  // const downloadPDF = () => {
  //   const capture = document.querySelector('.payslip');
  //   setLoader(true);
  //   html2canvas(capture).then((canvas) => {
  //     const imgData = canvas.toDataURL('img/png');
  //     const doc = new jsPDF('p', 'mn', 'a4');
  //     const componentWidth = doc.internalPageSize.getWidth();
  //     const componentHeight = doc.internalPageSize.getHeight();
  //     doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
  //     setLoader(false);
  //     doc.save('payslip.pdf');
  //   })
  // }

  const downloadPDF = async () => {
    const input = document.querySelector('.payslip');
    setLoader(true);
  
    try {
      const canvas = await html2canvas(input);
      const imgWidth = 208;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const imgData = canvas.toDataURL('img/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('payslip.pdf');
      setLoader(false);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setLoader(false);
    }
  };
  

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

  useEffect(() => {
    const generatedNumber = Math.floor(Math.random() * 90000) + 10000
    setPaySlipNumber(generatedNumber)

    // Save to local storage
    localStorage.setItem('paySlipNumber', JSON.stringify(generatedNumber))
  }, [])

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

  useEffect(() => {
    // Trigger downloadPDF after the component has been rendered
    if (employeeId) {
      downloadPDF();
    }
  }, [employeeId]);

  const employeeName = () => {
    const fullName = `${firstName || ''} ${lastName || ''}`
    return fullName.trim()
  }

  // function to convert numbers to words
  const numberToWords = (number) => {
    const units = [
      '',
      'One',
      'Two',
      'Three',
      'Four',
      'Five',
      'Six',
      'Seven',
      'Eight',
      'Nine',
    ]
    const teens = [
      '',
      'Eleven',
      'Twelve',
      'Thirteen',
      'Fourteen',
      'Fifteen',
      'Sixteen',
      'Seventeen',
      'Eighteen',
      'Nineteen',
    ]
    const tens = [
      '',
      'Ten',
      'Twenty',
      'Thirty',
      'Forty',
      'Fifty',
      'Sixty',
      'Seventy',
      'Eighty',
      'Ninety',
    ]

    const convertChunkToWords = (chunk) => {
      let words = ''

      if (chunk >= 100) {
        words += units[Math.floor(chunk / 100)] + ' Hundred '
        chunk %= 100
      }

      if (chunk >= 11 && chunk <= 19) {
        words += teens[chunk - 10] + ' '
        return words
      } else if (chunk >= 10 || chunk >= 20) {
        words += tens[Math.floor(chunk / 10)] + ' '
        chunk %= 10
      }

      if (chunk > 0) {
        words += units[chunk] + ' '
      }

      return words
    }

    if (number === 0) {
      return 'Zero'
    }

    let words = ''

    if (number < 0) {
      words += 'Negative '
      number = Math.abs(number)
    }

    if (number >= 1e9) {
      words += convertChunkToWords(Math.floor(number / 1e9)) + 'Billion '
      number %= 1e9
    }

    if (number >= 1e6) {
      words += convertChunkToWords(Math.floor(number / 1e6)) + 'Million '
      number %= 1e6
    }

    if (number >= 1e3) {
      words += convertChunkToWords(Math.floor(number / 1e3)) + 'Thousand '
      number %= 1e3
    }

    words += convertChunkToWords(number)

    return words.trim()
  }

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
            <div className="payslip">
              <button
                onClick={downloadPDF}
                disabled={!loader === false}
                className="bg-orange-500 text-white font-bold px-3 pt-1 pb-1 rounded-sm md:-mt-1"
                style={{
                  fontSize: '14px',
                  marginLeft: '580px',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '50px',
                  padding: '0.3rem 1.5rem',
                }}
              >
                <img src={print} alt="Upload" className="mr-2" />
                {loader ? (
                  <span>Downloading</span>
                ) : (
                  <span>Download Payslip</span>
                )}
              </button>
            </div>
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
              <div className="font-bold mt-1 font-title">
                Payslip #{payslipNumber}
              </div>
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
          <div
            className="-mt-4 px-2 font-satoshi font-bold text-left"
            style={{ fontSize: '14px' }}
          >
            Net Salary: {salaryFormatter(salary)}
            <span
              className="text-gray-600 font-copy px-1"
              style={{ fontSize: '14px' }}>

                    ( {numberToWords(Number(salary))} Naira only )
            </span>
          </div>
        </div>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="mt-4 mb-8 px-36 pt-2 pb-2 font-satoshi font-normal"
        style={{
          borderRadius: '14px',
          fontSize: '18px',
        }}
      >
        Go Back
      </button>
    </div>
  )
}

export default Payslip
