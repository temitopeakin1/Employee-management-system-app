import React, { useState, useEffect } from "react";
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
  Group,
  Toolbar,
  Resize,
  Sort,
  Filter,
  Edit,
  Selection,
} from "@syncfusion/ej2-react-grids";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { AiOutlineUpload, AiOutlinePaperClip } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";

const Employees = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ["Search", "Delete"];
  const editing = { allowDeleting: true, allowEditing: true };

  const [isModalVisible, setModalVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [cv, setCV] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [client, setClient] = useState("");
  const [contractStartDate, setContractStartDate] = useState("");
  const [contractEndDate, setContractEndDate] = useState("");
  const [salary, setSalary] = useState("");
  const [employeesData, setEmployeesData] = useState([]);
  const [designationId, setDesignationId] = useState("");
  const [statusId, setStatusId] = useState("");
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalContractEmployees, setTotalContractEmployees] = useState(0);
  const [averageSalary, setAverageSalary] = useState(0);
  const [kpis, setKPIs] = useState({});

  useEffect(() => {
    const storedEmployeesData = localStorage.getItem("employeesData");
    if (storedEmployeesData) {
      setEmployeesData(JSON.parse(storedEmployeesData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("employeesData", JSON.stringify(employeesData));
  }, [employeesData]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCVChange = (e) => {
    setCV(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleClientChange = (e) => {
    setClient(e.target.value);
  };

  const handleSalaryChange = (e) => {
    setSalary(e.target.value);
  };

  const handleCancel = () => {
    setFirstName("");
    setLastName("");
    setCV("");
    setEmail("");
    setAddress("");
    setPhoneNumber("");
    setClient("");
    setSalary("");
    setCurrentStep(1);
    toggleModal();
  };

  const designation = [
    { Id: "1", Role: "Software Developer" },
    { Id: "2", Role: "Frontend Engineer" },
    { Id: "3", Role: "Backend Engineer" },
    { Id: "4", Role: "FullStack Developer" },
    { Id: "5", Role: "Product Designer" },
    { Id: "6", Role: "Scrum Master" },
    { Id: "7", Role: "Product Owner" },
  ];

  const empType = [
    { type: "1", Emp: "Ful-Time" },
    { type: "2", Emp: "Contract" },
    { type: "3", Emp: "Part-Time" },
  ];

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleSubmit = () => {
    const employeeId = `HH${Math.floor(Math.random() * 10000)}`;

    // Increment the total employees count
    setTotalEmployees(totalEmployees + 1);

    // Increment the total contract employees count if empType is "Contract"
    if (statusId === "2") {
      setTotalContractEmployees(totalContractEmployees + 1);
    }

    // Calculate average salary
    const totalSalary = employeesData.reduce(
      (total, employee) => total + parseInt(employee.salary),
      0
    );
    const avgSalary = totalSalary / employeesData.length;
    setAverageSalary(avgSalary);

    // Calculate KPIs
    // ... Perform calculations to determine the KPIs
    // Set the KPIs state variable
    //   setKPIs({
    //     kpi1: ...,
    //     kpi2: ...,
    //     // Add more KPIs as needed
    //   });
    // }, [employeesData]);

    const newEmployee = {
      id: employeeId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      designation:
        designation.find((item) => item.Id === designationId)?.Role || "",
      empType: empType.find((item) => item.type === statusId)?.Emp || "",
      // cv: cv,
      // address: address,
      phoneNumber: phoneNumber,
      contractStartDate: contractStartDate,
      contractEndDate: contractEndDate,
      salary: salary,
    };

    const updatedEmployeesData = [...employeesData, newEmployee];

    setEmployeesData(updatedEmployeesData);
    

    // Resetting the form state
    setFirstName("");
    setLastName("");
    setCV("");
    setEmail("");
    setAddress("");
    setPhoneNumber("");
    setCV("");
    setClient("");
    setSalary("");
    setCurrentStep(1);

    // Close the modal
    toggleModal();
  };

  return (
    
    <div>
      <div className="justify-center">
        <div className="dark:text-gray-200 dark:bg-secondary-dark-bg ml-4 mr-4 mt-10 mb-10">
          <div className="justify-left -mt-5">
            <p className="font-bold text-3xl">Employees</p>
          </div>
        </div>
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
          <button onClick={toggleModal}>Add Employee</button>
          <GridComponent
            dataSource={employeesData}
            enableHover={false}
            width="auto"
            allowPaging
            allowSorting
            pageSettings={{ pageCount: 5 }}
            editSettings={editing}
            selectionSettings={selectionsettings}
            toolbar={toolbarOptions}
          >
            <ColumnsDirective>
              <ColumnDirective field="id" headerText="ID" width="200" />
              <ColumnDirective
                field="fullName"
                headerText="Name"
                width="300"
                template={(rowData) => (
                  <div>
                    {rowData.firstName} {rowData.lastName}
                    <div>{rowData.email}</div>
                  </div>
                )}
              />
              <ColumnDirective
                field="designation"
                headerText="Position"
                width="300"
              />
              <ColumnDirective field="department" headerText="department" />
              <ColumnDirective field="phoneNumber" headerText="Phone Number" />
              <ColumnDirective field="empType" headerText="Status" />
            </ColumnsDirective>

            <Inject
              services={[
                Resize,
                Selection,
                Sort,
                Filter,
                Edit,
                Search,
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
          <div class="modal-content">
            {currentStep === 1 && (
              <div>
                <h2 className="modal-heading">
                  Add Employee
                  <MdOutlineCancel onClick={handleCancel} />
                </h2>
                <div className="form-row">
                  <label htmlFor="firstname">
                    First Name
                    <input
                      type="text"
                      id="firstname"
                      value={firstName}
                      onChange={handleFirstNameChange}
                    />
                  </label>
                  <label htmlFor="lastname">
                    Last Name
                    <input
                      type="text"
                      id="lastname"
                      value={lastName}
                      onChange={handleLastNameChange}
                    />
                  </label>
                </div>
                <label htmlFor="email">
                  Email
                  <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </label>
                <label htmlFor="address">
                  Address
                  <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={handleAddressChange}
                  />
                </label>
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
                <label>Upload CV</label>
                <label htmlFor="uploadcv" className="file-upload-label">
                  <div className="file-upload-box">
                    <div className="file-upload-icon">
                      <AiOutlineUpload />
                    </div>
                    <div className="file-upload-text">Select or Drop file</div>
                  </div>
                  <input
                    type="file"
                    id="uploadcv"
                    accept=".pdf,.doc,.docx"
                    onChange={handleCVChange}
                  />
                </label>
                <div className="file-input-icon">
                  <AiOutlinePaperClip className="upload-icon" />
                  <span>Select Files</span>
                </div>

                <button type="button" onClick={handleNext}>
                  Next
                </button>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h2>Add Employee</h2>
                <label htmlFor="client">
                  Client
                  <input
                    type="text"
                    id="client"
                    value={client}
                    onChange={handleClientChange}
                  />
                </label>
                <div className="form-row">
                  <label htmlFor="datepicker">Contract Start Date </label>
                  <DatePickerComponent
                    id="datepicker"
                    placeholder="Select a date"
                    format="yyyy-MM-dd"
                    value={contractStartDate}
                    onChange={(args) => setContractStartDate(args.value)}
                  />
                  <label htmlFor="datepicker">Contract End Date </label>
                  <DatePickerComponent
                    id="datepicker"
                    placeholder="Select a date"
                    format="yyyy-MM-dd"
                    value={contractEndDate}
                    onChange={(args) => setContractEndDate(args.value)}
                  />
                </div>
                <label htmlFor="designation">
                  Designation
                  <DropDownListComponent
                    dataSource={designation}
                    fields={{ text: "Role", value: "Id" }}
                    placeholder="Select a designation"
                    value={designationId}
                    change={(args) => setDesignationId(args.value)}
                  />
                </label>
                <label htmlFor="salary">
                  Salary Renumeration
                  <input
                    type="text"
                    id="salary"
                    value={salary}
                    onChange={handleSalaryChange}
                  />
                </label>
                <label htmlFor="empType">
                  Employment Type
                  <DropDownListComponent
                    dataSource={empType}
                    fields={{ text: "Emp", value: "type" }}
                    placeholder="Select an Status Type"
                    value={statusId}
                    change={(args) => setStatusId(args.value)}
                  />
                </label>
                <button type="button" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
