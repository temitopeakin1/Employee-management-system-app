import React, { useState, useEffect } from 'react'
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  // Search,
  Page,
  Group,
  Toolbar,
  Resize,
  Sort,
  Filter,
  Edit,
  Selection,
} from '@syncfusion/ej2-react-grids'
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars'
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns'
import {
  AiOutlineUpload,
  AiOutlinePaperClip,
  AiOutlineSearch,
} from 'react-icons/ai'
import { MdOutlineCancel } from 'react-icons/md'
import { FiPhone } from 'react-icons/fi'
import dialog from '../assets/dialog.png'
// import Spinner from '../common/Spinner';

const Employees = () => {
  const selectionsettings = { persistSelection: true }
  const toolbarOptions = ['Delete']
  const editing = { allowDeleting: true, allowEditing: true }

  const [isModalVisible, setModalVisible] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [cv, setCV] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [client, setClient] = useState('')
  const [contractStartDate, setContractStartDate] = useState('')
  const [contractEndDate, setContractEndDate] = useState('')
  const [salary, setSalary] = useState('')
  const [employeesData, setEmployeesData] = useState([])
  const [designationId, setDesignationId] = useState('')
  const [statusId, setStatusId] = useState('')
  const [totalEmployees, setTotalEmployees] = useState(0)
  const [totalContractEmployees, setTotalContractEmployees] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [departmentId, setDepartmentId] = useState('')
  const [addEmployee, setAddEmployee] = useState(false)
  const [addedFirstName, setAddedFirstName] = useState('')
  const [addedLastName, setAddedLastName] = useState('')
  const [cvFileData, setCVFileData] = useState(null)

  // Define error states for form fields
  const [firstNameError, setFirstNameError] = useState('')

  useEffect(() => {
    const storedEmployeesData = localStorage.getItem('employeesData')
    if (storedEmployeesData) {
      setEmployeesData(JSON.parse(storedEmployeesData))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('employeesData', JSON.stringify(employeesData))
  }, [employeesData])

  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value)
  }

  const handleLastNameChange = (e) => {
    setLastName(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleCVChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setCV(file)
      setCVFileData(URL.createObjectURL(file)) // Store file data for display
    } else {
      setCV(null)
      setCVFileData(null) // Clear file data
    }
  }

  const handleAddressChange = (e) => {
    setAddress(e.target.value)
  }

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value)
  }

  const handleClientChange = (e) => {
    setClient(e.target.value)
  }

  const handleSalaryChange = (e) => {
    setSalary(e.target.value)
  }

  const getFilteredData = () => {
    return employeesData.filter(
      (employee) =>
        employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  const handleCancel = () => {
    setFirstName('')
    setLastName('')
    setCV('')
    setEmail('')
    setAddress('')
    setPhoneNumber('')
    setClient('')
    setSalary('')
    setDesignationId('')
    setDepartmentId('')
    setCurrentStep(1)
    toggleModal()
  }

  const designation = [
    { Id: '1', Role: 'Software Developer' },
    { Id: '2', Role: 'Frontend Engineer' },
    { Id: '3', Role: 'Backend Engineer' },
    { Id: '4', Role: 'FullStack Developer' },
    { Id: '5', Role: 'Product Designer' },
    { Id: '6', Role: 'Scrum Master' },
    { Id: '7', Role: 'Product Owner' },
    { Id: '8', Role: 'HR Manager' },
    { Id: '9', Role: 'Administrative Officer' },
  ]

  const department = [
    { Id: '1', Dept: 'Software Engineering' },
    { Id: '2', Dept: 'Administrative' },
    { Id: '3', Dept: 'Human Resources' },
  ]

  const empType = [
    { type: '1', Emp: 'Full-Time' },
    { type: '2', Emp: 'Contract' },
    { type: '3', Emp: 'Part-Time' },
  ]

  const handleNext = () => {
    setCurrentStep(currentStep + 1)
    if (currentStep === 1) {
      if (!firstName) {
        setFirstNameError('Input first Name')
        return
      } else {
        setFirstNameError('')
      }
    }
  }

  const handleSubmit = () => {
    const employeeId = `HH${Math.floor(Math.random() * 10000)}`
    setAddedFirstName(firstName)
    setAddedLastName(lastName)

    // Increment the total employees count
    setTotalEmployees(totalEmployees + 1)

    // Increment the total contract employees count if empType is "Contract"
    if (statusId === '2') {
      setTotalContractEmployees(totalContractEmployees + 1)
    }

    const newEmployee = {
      id: employeeId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      designation:
        designation.find((item) => item.Id === designationId)?.Role || '',
      department:
        department.find((item) => item.Id === departmentId)?.Dept || '',
      empType: empType.find((item) => item.type === statusId)?.Emp || '',
      cv: cv,
      // address: address,
      phoneNumber: phoneNumber,
      contractStartDate: contractStartDate,
      contractEndDate: contractEndDate,
      salary: salary,
    }
    // updates an employee data
    const updatedEmployeesData = [...employeesData, newEmployee]
    setEmployeesData(updatedEmployeesData)

    // Resetting the form state
    setFirstName('')
    setLastName('')
    setCV('')
    setEmail('')
    setAddress('')
    setPhoneNumber('')
    setCV('')
    setClient('')
    setSalary('')
    setCurrentStep(1)

    // Close the modal
    toggleModal()
    setAddEmployee(true)
    console.log('firstName: ' + firstName)
    console.log('lastName: ' + lastName)
    console.log('add employee')

    // Reset form fields
    setFirstName('')
    setLastName('')
    console.log(firstName)
  }

  return (
    <div>
      <div className="flex justify-end mr-80 -mt-5">
        <button
          onClick={toggleModal}
          className="bg-orange-500 text-white font-bold py-1 px-8 -mt-14 pt-1 rounded"
          style={{ zIndex: 100 }}
          disabled={addEmployee}
        >
          Add Employee
        </button>
      </div>
      <div className="justify-center">
        <div className="dark:text-gray-200 dark:bg-secondary-dark-bg ml-4 mr-4 mt-20 mb-10">
          <div className="flex items-center mb-2 ">
            <p className="font-semibold text-2xl">Employees</p>
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-3 ml-20 py-2 pl-8 pr-40 rounded border border-gray-300 focus:outline-none"
              />
              <div className="search-icon">
                <AiOutlineSearch size={18} className="text-gray-500" />
              </div>
            </div>
          </div>
        </div>
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-xl">
          <GridComponent
            dataSource={getFilteredData()}
            enableHover={false}
            width="auto"
            allowPaging
            allowSorting
            // allowSearching={true}
            pageSettings={{ pageCount: 5 }}
            editSettings={editing}
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
              <ColumnDirective
                field="department"
                headerText="Department"
                cssClass="department-column"
              />
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

            <Inject
              services={[
                Resize,
                Selection,
                Sort,
                Filter,
                Edit,
                // Search,
                Page,
                Toolbar,
                Group,
              ]}
            />
          </GridComponent>
        </div>
      </div>

      {isModalVisible && (
        <div className="modal">
          <div className="modal-content">
            {currentStep === 1 && (
              <div>
                <h2 className="modal-heading">
                  Add Employee
                  <MdOutlineCancel onClick={handleCancel} />
                </h2>
                <div className="w-full max-w-lg">
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                      <label htmlFor="firstname">
                        First Name
                        <input
                          type="text"
                          id="firstname"
                          value={firstName}
                          placeholder="employees firstname"
                          onChange={handleFirstNameChange}
                        />
                      </label>
                      {firstNameError && (
                        <p className="text-red-500">{firstNameError}</p>
                      )}
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label htmlFor="lastname">
                        Last Name
                        <input
                          type="text"
                          id="lastname"
                          value={lastName}
                          placeholder="employees lastname"
                          onChange={handleLastNameChange}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-12">
                    <div className="w-full px-3 -mt-6">
                      <label htmlFor="email">
                        Email
                        <input
                          type="text"
                          id="email"
                          value={email}
                          placeholder="employees email"
                          onChange={handleEmailChange}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-12">
                    <div className="w-full px-3 -mt-12">
                      <label htmlFor="address">
                        Address
                        <input
                          type="text"
                          id="address"
                          value={address}
                          placeholder="employees address"
                          onChange={handleAddressChange}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-12">
                    <div className="w-full px-3 -mt-12">
                      <label htmlFor="phonenumber">
                        Phone Number
                        <input
                          type="number"
                          id="phonenumber"
                          value={phoneNumber}
                          placeholder="phonenumber"
                          onChange={handlePhoneNumberChange}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-12">
                    <div className="w-full px-3 -mt-12">
                      <label>Upload CV</label>
                      <label htmlFor="uploadcv" className="file-upload-label">
                        <div className="file-upload-box">
                          <div className="file-upload-icon">
                            <AiOutlineUpload />
                          </div>
                          <div className="file-upload-text">
                            {cvFileData ? 'CV Uploaded' : 'Select or Drop file'}
                          </div>
                        </div>
                        {cvFileData && (
                          <div>
                            <p>{cv.name}</p>
                            <a
                              href={cvFileData}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View CV
                            </a>
                          </div>
                        )}
                        <input
                          type="file"
                          id="uploadcv"
                          accept=".pdf,.doc,.docx"
                          onChange={handleCVChange}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="file-input-icon mb-3">
                    <AiOutlinePaperClip className="upload-icon" />
                    <span>Select Files</span>
                  </div>
                  <div className="btn">
                    <button onClick={handleNext}>Next</button>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h2 className="modal-heading">
                  Add Employee
                  <MdOutlineCancel onClick={handleCancel} />
                </h2>
                <div className="w-full max-w-lg">
                  <div className="flex flex-wrap -mx-3 mb-12">
                    <div className="w-full px-6 mb-3 md:mb-0">
                      <label htmlFor="client">
                        Client
                        <input
                          type="text"
                          id="client"
                          value={client}
                          placeholder="Client"
                          onChange={handleClientChange}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="form-row -mt-12">
                    <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                      <label htmlFor="datepicker" className="form-label">
                        Contract Start Date
                        <DatePickerComponent
                          id="datepicker"
                          placeholder="Select a date"
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
                          placeholder="Select a date"
                          format="yyyy-MM-dd"
                          value={contractEndDate}
                          onChange={(args) => setContractEndDate(args.value)}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="w-full px-3 mt-6">
                    <label htmlFor="designation">
                      Designation
                      <DropDownListComponent
                        dataSource={designation}
                        fields={{ text: 'Role', value: 'Id' }}
                        placeholder="Select a designation"
                        value={designationId}
                        change={(args) => setDesignationId(args.value)}
                      />
                    </label>
                  </div>
                  <div className="w-full px-3 mt-6">
                    <label htmlFor="department">
                      Department
                      <DropDownListComponent
                        dataSource={department}
                        fields={{ text: 'Dept', value: 'Id' }}
                        placeholder="Select a department"
                        value={departmentId}
                        change={(args) => setDepartmentId(args.value)}
                      />
                    </label>
                  </div>
                  <div className="w-full px-3 mt-6">
                    <label htmlFor="salary">
                      Salary Renumeration
                      <input
                        type="text"
                        id="salary"
                        value={salary}
                        onChange={handleSalaryChange}
                      />
                    </label>
                  </div>
                  <div className="w-full px-3 mb-6">
                    <label htmlFor="empType">
                      Employment Type
                      <DropDownListComponent
                        dataSource={empType}
                        fields={{ text: 'Emp', value: 'type' }}
                        placeholder="Select a Status Type"
                        value={statusId}
                        change={(args) => setStatusId(args.value)}
                      />
                    </label>
                  </div>
                  <div className="btn">
                    <button onClick={handleSubmit}>Add Employee</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {addEmployee && (
        <div className="modal fixed inset-0 flex items-center justify-center z-100">
          <div className="success-dialog bg-white p-8 w-96 h-64 rounded shadow-lg flex flex-col items-center justify-center ">
            <div className="flex items-center mt-4">
              <img
                src={dialog}
                alt="Dialog"
                style={{ height: '80px', width: '120px' }}
              />
              <MdOutlineCancel onClick={handleCancel} />
            </div>

            <h1 className="text-xl font-bold pt-12 mb-4 -mt-12">
              Employee Successfully Added
            </h1>
            <p className="text-12 text-center -mt-2">
              You have succesfully added {addedFirstName} {addedLastName} as an{' '}
              <b>Hampshire Heights Employee</b>
            </p>
            <div className="flex space-x-4 mt-6 justify-center">
              <button className="btn-primary text-12">
                Send Acceptance Letter
              </button>
              <button className="btn-primary text-12">View Profile</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Employees
