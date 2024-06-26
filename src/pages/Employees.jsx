import React, { useState, useEffect } from 'react'
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Group,
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
import { BsFillTelephoneFill } from 'react-icons/bs'
import Navbar from '../components/Navbar'
import { MdOutlineCancel } from 'react-icons/md'
import dialog from '../assets/dialog.png'
import comfy from '../assets/comfy.png'
import edit from '../assets/view.svg'
import Vector from '../assets/Vector.svg'
import document from '../assets/document.svg'
import list from '../assets/list.png'
import { supabase } from '../supabaseClient'
import { departmentFilters, designation, department, empType }from '../data/dummy'
// import Spinner from '../common/Spinner';

const Employees = () => {
  const selectionsettings = { persistSelection: true }

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
  const [selectedDepartment, setSelectedDepartment] = useState('All Employees')
  const [isKebabMenuOpen, setKebabMenuOpen] = useState(false)
  const [kebabMenuX, setKebabMenuX] = useState(0)
  const [kebabMenuY, setKebabMenuY] = useState(0)
  const [currentRowData, setCurrentRowData] = useState(null)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)


  useEffect(() => {
    const storedEmployeesData = localStorage.getItem('employeesData')
    if (storedEmployeesData) {
      setEmployeesData(JSON.parse(storedEmployeesData))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('employeesData', JSON.stringify(employeesData))
  }, [employeesData])

  useEffect(() => {
    getEmployeesData()
  }, [])

  async function getEmployeesData() {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .limit(50)
      if (error) {
        console.error('Error fetching employee data:', Error)
      } else if (data) {
        setEmployeesData(data)
      }
    } catch (error) {
      console.error('Error fetching employee data:', Error)
    }
  }

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

  // filter employee list
  const getFilteredData = () => {
    // conditionals
    if (selectedDepartment === 'All Employees') {
      return employeesData.filter(
        (employee) =>
          employee.firstName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()),
        console.log(getFilteredData),
      )
    } else {
      return employeesData.filter(
        (employee) =>
          (employee.firstName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
            employee.lastName
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) &&
          employee.department === selectedDepartment,
      )
    }
  }

  // logic to remove an employee from the employee list
  const removeEmployee = async (employeeId) => {
    try {
      const { data, error } = await supabase
        .from('employees')
        .delete(employeeId)
        .eq('employeeId', String(employeeId))
      if (error) throw error
      if (data != null) {
        // Filter out the removed employee from the local state
        const updatedEmployeesData = employeesData.filter(
          (employee) => employee.employeeId !== employeeId,
        )
        setEmployeesData(updatedEmployeesData)

        // Show success notification
        setShowSuccessDialog(true)
      }
    } catch (error) {
      console.error('Error removing employee:', error)
    }
  }
  

  // handle kebab menu clicks
  const handleKebabMenuClick = (event, rowData) => {
    event.preventDefault()
    const cell = event.target.closest('.e-rowcell')
    if (cell && rowData && rowData.employeeId) {
      const cellRect = cell.getBoundingClientRect()
      setKebabMenuOpen((prevOpen) => !prevOpen) // Toggle the state
      setKebabMenuX(cellRect.left - 200)
      setKebabMenuY(cellRect.bottom)
      setCurrentRowData(rowData)
    }
  }

  // Function to handle closing the kebab menu
  const closeKebabMenu = () => {
    setKebabMenuOpen(false)
    setCurrentRowData(null)
  }

  // Render the kebab menu when it's open
  const renderKebabMenu = (rowData) => {
    if (isKebabMenuOpen) {
      return (
        <div
          className="kebab-menu-card absolute bg-white border rounded-xl shadow-lg"
          style={{
            top: kebabMenuY,
            left: kebabMenuX,
            padding: '8px',
            zIndex: 100,
            marginTop: '-30px',
            marginLeft: '31px',
          }}
        >
          <ul className="list-none rounded-xl">
            <li>
              <button
                className="cursor-pointer bg-transparent font-satoshi text-black font-light py-2 px-4 w-full text-left text-12 flex items-center hover:bg-sky-700 hover:text-white"
                onClick={viewProfile}
              >
                <img src={edit} alt="View-employee" className="mr-2" />
                View Profile
              </button>
            </li>
            <li>
              <button
                className="cursor-pointer bg-transparent font-satoshi text-black font-light py-2 px-4 w-full text-left text-12 flex items-center hover:bg-sky-700 hover:text-white"
                onClick={editEmployeeDetails}
              >
                <img src={document} alt="Edit-employee" className="mr-2" />
                Edit Employee Details
              </button>
            </li>
            <li>
              <button
                className="cursor-pointer bg-transparent font-satoshi text-black font-light py-2 px-4 w-full text-left text-12 flex items-center hover:bg-sky-700 hover:text-white"
                onClick={() => removeEmployee(rowData.employeeId)}
              >
                <img src={Vector} alt="Remove-employee" className="mr-2" />
                Remove Employee
              </button>
            </li>
          </ul>
        </div>
      )
    }
    return null
  }

  // Function to handle "View Profile" option
  const viewProfile = () => {
    // Implement the logic for viewing the employee's profile
    closeKebabMenu()
  }

  // Function to handle "Edit Employee Details" option
  const editEmployeeDetails = () => {
    // Implement the logic for editing the employee's details
    closeKebabMenu()
  }

  // Function to handle "View Employees" option
  const viewAllEmployees = () => {
    // Implement the logic for viewing all employees
    closeKebabMenu()
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

  const handleSwitchView = (viewType) => {}

  const handleNext = () => {
    setCurrentStep(currentStep + 1)
    if (currentStep === 1) {
    }
  }

  const handleCancelDialog = () => {
    setShowSuccessDialog(!showSuccessDialog)
  }

  async function handleSubmit() {
    const employeeId = `HH${Math.floor(Math.random() * 10000)}`
    try {
      const { data, error } = await supabase.from('employees').insert({
        employeeId: employeeId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        designation:
          designation.find((item) => item.Id === designationId)?.Role || '',
        department:
          department.find((item) => item.Id === departmentId)?.Dept || '',
        empType: empType.find((item) => item.type === statusId)?.Emp || '',
        cv: cv,
        address: address,
        phoneNumber: phoneNumber,
        client: client,
        contractStartDate: contractStartDate,
        contractEndDate: contractEndDate,
        salary: salary,
      })
      if (error) throw error
      if (data != null) {
        setEmployeesData(data)
      }
    } catch (error) {
      alert(error.message)
    }
    const newEmployee = {
      employeeId: employeeId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      designation:
        designation.find((item) => item.Id === designationId)?.Role || '',
      department:
        department.find((item) => item.Id === departmentId)?.Dept || '',
      empType: empType.find((item) => item.type === statusId)?.Emp || '',
      cv: cv,
      address: address,
      phoneNumber: phoneNumber,
      client: client,
      contractStartDate: contractStartDate,
      contractEndDate: contractEndDate,
      salary: salary,
    }

    setAddedFirstName(firstName)
    setAddedLastName(lastName)
    handleCancelDialog()

    // Increment the total employees count
    setTotalEmployees(totalEmployees + 1)

    // Increment the total contract employees count if empType is "Contract"
    if (statusId === '2') {
      setTotalContractEmployees(totalContractEmployees + 1)
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
      <div className="justify-center">
        <Navbar
          pageTitle={
            <div className="flex items-center">
              <p
                style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontWeight: '600',
                  fontSize: '22px',
                }}
                className="font-bold text-2xl mr-5 -mt-6 pt-1"
              >
                Employees
              </p>
              <div className="search-input-container">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-sm mb-3 ml-4 py-1 pl-8 pr-40 rounded focus:outline-none"
                />
                <div className="search-icon">
                  <AiOutlineSearch size={22} className="text-gray-300" />
                </div>
              </div>
              <div className="view-buttons border border-gray-200 rounded px-2 mb-2">
                <button
                  className="view-button md:w-8 md:h-8 w-6 h-6"
                  onClick={() => handleSwitchView('grid')}
                >
                  <img src={list} alt="list" className="w-full h-full" />
                </button>
                <button
                  className="view-button md:w-8 md:h-8 w-6 h-6"
                  onClick={() => handleSwitchView('list')}
                >
                  {' '}
                  <img src={comfy} alt="comfy" className="w-full h-full" />
                </button>
              </div>
              <button
                onClick={toggleModal}
                className="bg-orange-500 text-white font-bold px-8 -mt-4 ml-32 pt-1 rounded"
                style={{ zIndex: 100, fontSize: '14px' }}
                disabled={addEmployee}
              >
                Add Employee
              </button>
            </div>
          }
        />
      </div>

      <div className="justify-center">
        <div className="m-10 md:m-5 pt-5 p-2 md:p-2 bg-white rounded-xl">
          <div className="md:m-5 -mt-4 space-x-2">
            {departmentFilters.map((department) => (
              <button
                key={department}
                onClick={() => setSelectedDepartment(department)}
                className="px-2 -ml-5 -py-24 bg-transparent font-semibold text-gray-600 text-sm department-filter"
              >
                {department}
              </button>
            ))}
          </div>
          <GridComponent
            dataSource={getFilteredData() || []}
            enableHover={true}
            width="auto"
            allowPaging={true}
            allowSorting
            pageSettings={{ pageCount: 3, pageSize: 11 }}
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
                    <div className="font-bold text-14">
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
                    <div className="text-sm font-semibold">
                      {rowData.firstName} {rowData.lastName}
                    </div>
                    <div className="text-gray-400 text-sm">{rowData.email}</div>
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
                template={(rowData) => {
                  const departmentItem = department.find(
                    (item) => item.Dept === rowData.department,
                  )
                  const dotClass = `dot ${departmentItem}`
                  return (
                    <div>
                      <span className={dotClass}></span>
                      {rowData.department}
                    </div>
                  )
                }}
              />

              <ColumnDirective
                field="phoneNumber"
                headerText="Phone Number"
                template={(rowData) => (
                  <div className="flex items-center">
                    <BsFillTelephoneFill className="phone-icon mr-2" />
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
                  return <div className={statusClass}>{rowData.empType}</div>
                }}
              />

              <ColumnDirective
                field="kebabMenu"
                headerText=""
                width="50"
                template={(rowData) => (
                  <div
                    className="kebab-menu-trigger"
                    onClick={(e) => handleKebabMenuClick(e, rowData)}
                  >
                    ⋮
                  </div>
                )}
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
                // Toolbar,
                Group,
              ]}
            />
          </GridComponent>
        </div>
      </div>
      {/* trigger employee form  */}
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
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label class="firstname">
                        First Name
                        <input
                          type="text"
                          id="firstname"
                          value={firstName}
                          placeholder="employees firstname"
                          onChange={handleFirstNameChange}
                        />
                      </label>
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
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3 mt-1">
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
                  <div className="form-row mt-1">
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

                  <div className="w-full px-3 mt-1">
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
                  <div className="w-full px-3 mt-1">
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
                  <div className="w-full px-3 mt-1">
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
                  <div className="w-full px-3 mb-1">
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
                  <button onClick={handleSubmit} className="button">
                    Add Employee
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {showSuccessDialog && (
        <div className="modal fixed inset-0 flex items-center justify-center z-100">
          <div className="success-dialog bg-white p-8 w-96 h-72 rounded-lg shadow-lg flex flex-col items-center justify-center ">
            <div className="flex items-center mt-2">
              <img
                src={dialog}
                alt="Dialog"
                style={{ height: '80px', width: '120px' }}
              />
              <button
                className="btn-primary"
                style={{
                  marginLeft: '13.5rem',
                  borderColor: 'white',
                  marginTop: '-80px',
                  color: 'gray',
                  backgroundColor: 'transparent',
                }}
                onClick={handleCancelDialog}
              >
                X
              </button>
            </div>

            <h1 className="text-xl font-bold pt-12 mb-4 -mt-12">
              Employee Successfully Added
            </h1>
            <p className="text-12 text-center -mt-2">
              You have succesfully added {addedFirstName} {addedLastName} as an{' '}
              <b>Dynasty Tech Employee</b>
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
      {renderKebabMenu()}
    </div>
  )
}

export default Employees
