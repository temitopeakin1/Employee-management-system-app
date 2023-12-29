import React, { useState } from 'react'
import Navbar from '../components/Navbar'
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css'; // Import the styles
import '@syncfusion/ej2-base/styles/material.css'
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars'

const Contracts = () => {
  const breadcrumbs = [
    { label: 'Contract', link: '/contracts' },
    { label: 'General Info', link: '/general-info' },
    { label: 'Scope of Work', link: '/scope-of-work' },
    { label: 'Payment Details', link: '/payment-details' },
    { label: 'Sign' },
  ]

  const [empName, setEmpName] = useState('');
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [contractEndDate, setContractEndDate] = useState([]);
  const [contractStartDate, setContractStartDate] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [currency, setCurrency] = useState('NGN');
  const [scope, setScope] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep(currentStep + 1)
  }

  // set states
  const handleChange = (e) => {
    setEmpName(e.target.value)
  }

  // const handleCompanyChange = (e) => {
  //   setCompany(e.target.value)
  // }

  // const handleJobChange = (e) => {
  //   setJobTitle(e.target.value)
  // }

  // const handleProjectNameChange = (e) => {
  //   setProjectName(e.target.value)
  // }

  // const handleCurrencyChange = (e) => {
  //   setCurrency(e.target.value)
  // }

  const handleScopeChange = (e) => {
    setScope(e.target.value)
  }

  const renderGeneralInfo = () => {
    return (
      <div className="flex flex-col items-center justify-center font-copy">
        <h2 className="contract-heading text-center font-semibold font-copy mt-4">
          General Information
        </h2>
        <form className="w-full max-w-2xl border border-gray-300 rounded-lg shadow-lg bg-white h-auto mb-16">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-10 mt-8">
              <label className="employeename font-copy">
                Employee Name
                <input
                  type="text"
                  id="empName"
                  value={empName}
                  placeholder="Employee's Name"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  style={{
                    fontSize: '16px',
                  }}
                />
              </label>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6 text-center font-copy">
            <div className="w-full md:w-1/2 px-3 pl-10">
              <label htmlFor="company ">
                Company
                <input
                  type="text"
                  id="company"
                  value={company}
                  placeholder="Company"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg font-title"
                  style={{ fontSize: '16px' }}
                />
              </label>
            </div>

            <div className="w-full md:w-1/2 px-3 pr-10">
              <label htmlFor="jobtitle font-title">
                Job Title
                <input
                  type="text"
                  id="jobtitle"
                  value={jobTitle}
                  placeholder="Job Title"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  style={{ fontSize: '16px' }}
                />
              </label>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6 text-center font-copy">
            <div className="w-full md:w-1/2 px-3 pl-10">
              <label htmlFor="projectname font-title">
                Project Name
                <input
                  type="text"
                  id="projectname"
                  value={projectName}
                  placeholder="UI/UX Design for MTN"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  style={{ fontSize: '16px' }}
                />
              </label>
            </div>

            <div className="w-full md:w-1/2 px-3 pr-10">
              <label htmlFor="currency font-title">
                Currency
                <input
                  type="text"
                  id="currency"
                  value={currency}
                  placeholder="NGN"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  style={{ fontSize: '16px' }}
                />
              </label>
            </div>
          </div>

          <div className="w-full px-10 mt-8 font-copy">
            <label htmlFor="datepicker font-title">
              Contract Start Date
              <DatePickerComponent
                id="datepicker"
                placeholder="Select date"
                format="dd-MM-yyyy"
                value={contractStartDate}
                onChange={(args) => setContractStartDate(args.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                style={{ fontSize: '16px' }}
              />
            </label>
          </div>
          <div className="w-full px-10 mt-8 font-copy">
            <label htmlFor="datepicker font-title">
              Contract End Date
              <DatePickerComponent
                id="datepicker"
                placeholder="Select date"
                format="dd-MM-yyyy"
                value={contractEndDate}
                onChange={(args) => setContractEndDate(args.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                style={{ fontSize: '16px' }}
              />
            </label>
          </div>
          <div className="btn flex justify-end pl-8 ml-16 mr-16 pr-8 pb-4 pt-4">
            <button
              onClick={handleNext}
              className="px-12 py-4 text-sm text-white"
              style={{ borderRadius: '50px', marginRight: '-70px' }}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    )
  }

  const renderScopeOfWork = () => {
    return (
      <div className="flex flex-col items-center justify-center font-copy">
        <h2 className="contract-heading text-center font-semibold font-copy mt-4 pb-2">
          Scope of Work
        </h2>
        <form className="w-full max-w-2xl border border-gray-300 rounded-lg shadow-lg bg-white h-auto" style={{ width: '150%'}}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-10 mt-8"   >
              <label className="scope font-copy"> Scope of Work</label>
              <textarea
                type="text"
                id="scope"
                cols="30"
                value={scope}
                onChange={handleScopeChange}
                rows="10"
                placeholder="Describe scope of work"
                className="w-full p-2 border border-gray-300 rounded-lg"
                style={{
                  fontSize: '16px',
                  width: '100%',
                }}
              />
            </div>
          </div>

          <div className="btn flex justify-end pr-8 pb-4 pt-4">
            <button
              onClick={handleNext}
              className="px-12 py-4 text-sm"
              style={{ borderRadius: '50px', marginRight: '-10px' }}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Navbar
        pageTitle="Create a Contract"
        showBreadcrumbs={true}
        breadcrumbs={breadcrumbs}
      />
      <div className="flex flex-col items-center justify-center font-copy">
        {currentStep === 1 && renderGeneralInfo()}
        {currentStep === 2 && renderScopeOfWork()}
        {/* Add more conditions for other steps as necessary */}
      </div>
    </div>
  )
}

export default Contracts
