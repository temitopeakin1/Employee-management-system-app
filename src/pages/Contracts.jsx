import React from 'react'
import Navbar from '../components/Navbar'
import { useStateContext } from '../contexts/ContextProvider'
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars'

const Contracts = () => {
  const breadcrumbs = [
    { label: 'Contract', link: '/contracts' },
    { label: 'General Info', link: '/general-info' },
    { label: 'Scope of Work', link: '/scope-of-work' },
    { label: 'Payment Details', link: '/payment-details' },
    { label: 'Sign' },
  ]

  //Resetting the form state
  setEmpName('')
  setCompany('')
  setJobTitle('')
  setContractStartDate('')
  setContractEndDate('')
  setProjectName('')
  setCurrency('')
  setCurrentStep('')

  return (
    <div className="justify-center">
      <Navbar
        pageTitle="Create a Contract"
        showBreadcrumbs={true}
        breadcrumbs={breadcrumbs}
      />
      <div className="dark:text-gray-200 dark:bg-secondary-dark-bg ml-4 mr-4 mt-5 mb-10">
        <div className="justify-left">
          <p className="font-semibold text-2xl mb-10">{Contracts}</p>
        </div>
      </div>
      <h2 className="text-center font-semibold font-title">
        General Information
      </h2>
      <div className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="employeename">
              Employee Name
              <input
                type="text"
                id="empName"
                value={empName}
                placeholder="employees Name"
                onChange={handleEmpNameChange}
              />
            </label>
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label htmlFor="">
              Company
              <input
                type="text"
                id=""
                value={company}
                placeholder="company"
                onChange={handleCompanyChange}
              />
            </label>
          </div>
        </div>
        <div className="w-full md:w-1/2 px-3">
          <div className="w-full px-3 -mt-6">
            <label htmlFor="jobtitle">
              Job Title
              <input
                type="text"
                id="jobtitle"
                value={jobTitle}
                placeholder="job title"
                onChange={handleJobChange}
              />
            </label>
          </div>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label htmlFor="">
            Project Name
            <input
              type="text"
              id="projectname"
              value={projectName}
              placeholder="UI/UX Design for MTN"
              onChange={handleProjectNameChange}
            />
          </label>
        </div>
      </div>
      <div className="w-full md:w-1/2 px-3">
        <div className="w-full px-3 -mt-6">
          <label htmlFor="currency">
            Currency
            <input
              type="text"
              id="currency"
              value={currency}
              placeholder="NGN"
              onChange={handleCurrencyChange}
            />
          </label>
        </div>
      </div>
      <div className="form-row mt-1">
        <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
          <label htmlFor="datepicker" className="form-label">
            Contract Start Date
            <DatePickerComponent
              id="datepicker"
              placeholder="Select date"
              format="yyyy-MM-dd"
              value={contractStartDate}
              onChange={(args) => setContractStartDate(args.value)}
            />
          </label>
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label htmlFor="datepicker" className="form-label">
            Contract End Date
            <DatePickerComponent
              id="datepicker"
              placeholder="Select date"
              format="yyyy-MM-dd"
              value={contractEndDate}
              onChange={(args) => setContractEndDate(args.value)}
            />
          </label>
        </div>
      </div>
      <div className="btn">
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  )
}
export default Contracts
