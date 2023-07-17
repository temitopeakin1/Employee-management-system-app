import React, { useState } from "react";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

function AddEmployeeModal({ isVisible, toggleModal, handleSubmit }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [cv, setCV] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contractStartDate, setContractStartDate] = useState("");
  const [contractEndDate, setContractEndDate] = useState("");
  const [salary, setSalary] = useState("");

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

  const handleSalaryChange = (e) => {
    setSalary(e.target.value);
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
    // Perform form submission or any required actions with the form data
    console.log("Form submitted");
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("CV:", cv);
    console.log("Address:", address);
    console.log("Phone Number:", phoneNumber);

    // Resetting the form state
    setFirstName("");
    setLastName("");
    setCV("");
    setEmail("");
    setAddress("");
    setPhoneNumber("");
    setCV("");
    setSalary("");
    setCurrentStep(1);

    // Close the modal
    toggleModal();
  };

  return (
    <div className="modal">
      {currentStep === 1 && (
        <div>
          <h2>Add Employee</h2>
          <label>
            First Name:
            <input
              type="text"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </label>
          <label>
            Email:
            <input type="text" value={email} onChange={handleEmailChange} />
          </label>
          <label>
            Address
            <input type="text" value={address} onChange={handleAddressChange} />
          </label>
          <label>
            Phone Number
            <input
              type="text"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </label>
          <label>
            Upload CV
            <input type="file" value={cv} onChange={handleCVChange} />
          </label>
          <button type="button" onClick={handleNext}>
            Next
          </button>
        </div>
      )}

      {currentStep === 2 && (
        <div>
          <h2>Add Employee</h2>
          <label>
            Client
            <input type="text" value={address} onChange={handleAddressChange} />
          </label>
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
          <label>
            Designation
            <DropDownListComponent
              dataSource={designation}
              fields={{ text: "Role", value: "Id" }}
              placeholder="Select a designation"
            />
          </label>
          <label>
            Salary Renumeration
            <input type="number" value={salary} onChange={handleSalaryChange} />
          </label>
          <label>
            Employment Type
            <DropDownListComponent
              dataSource={empType}
              fields={{ text: "Emp", value: "type" }}
              placeholder="Select an Employment Type"
            />
          </label>
          <button type="button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default AddEmployeeModal;
