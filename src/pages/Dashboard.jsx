import React from "react";
// import Greeting from "./Greeting";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
// import { useStateContext } from "../contexts/ContextProvider";
// import { employeesData } from "../data/dummy";
import { Pie } from "../components";
import { dropdownData, deptData } from "../data/dummy";
import Greeting from "./Greeting";

const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent
      id="time"
      fields={{ text: "Time", value: "Id" }}
      style={{ border: "none", color: currentMode === "Dark" && "white" }}
      value="1"
      dataSource={dropdownData}
      popupHeight="220px"
      popupWidth="120px"
    />
  </div>
);

const Dashboard = ({ averageSalary, kpis }) => {
  // const { currentColor, currentMode } = useStateContext();
  const toolbarOptions = ["Search"];
  const editing = { allowediting: true, allowDeleting: true };
  const selectionsettings = { persistSelection: true };
  // Retrieve employee data from local storage
  const storedEmployeesData = localStorage.getItem("employeesData");
  const employeesData = storedEmployeesData
    ? JSON.parse(storedEmployeesData)
    : [];

  // Calculate total employees and contract employees
  const totalEmployees = employeesData.length;
  const totalContractEmployees = employeesData.filter(
    (employee) => employee.empType === "Contract"
  ).length;
  const kpisFigure = kpis && kpis.figure;

  return (
    <div className="justify-center">
      <div className="dark:text-gray-200 dark:bg-secondary-dark-bg ml-4 mr-4 mt-5 mb-10">
        <div className="justify-left">
          <p className="font-bold text-3xl mb-10">Dashboard</p>
          <div className="font-semibold text-5xl">
            <Greeting />
          </div>
          <p className="font-bold text-gray-400 mt-2">
            Here's what is going on at Hampshire Heights
          </p>
        </div>
      </div>
      <div className="mt-5">
        <div className="flex flex-wrap lg:flex-nowrap gap-2 justify-center ">
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-32 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-400 pb-3">Total Employees</p>
                <p className="text font-semibold">{totalEmployees}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-32 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-400 pb-3">
                  Contract Employees
                </p>
                <p className="text font-semibold">{totalContractEmployees}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-32 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-400 pb-3">Avg. Salary</p>
                <p className="text font-semibold">{averageSalary}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-32 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-400 pb-3">Kpi's</p>
                <p className="text font-semibold">{kpisFigure}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="flex-grow ml-auto">
            <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg ml-4 mr-4 p-4 rounded-1xl md:w-1500">
              <div className="flex justify-between">
                <p className="font-semibold text-l">Mancount Per Department</p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="border-t border-gray-200 w-full mx-auto"></div>
              </div>
              <div className="ml-auto">
                <Pie
                  id="pie-chart"
                  data={deptData}
                  legendVisiblity={false}
                  height="300px"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 mt-3 gap-.2">
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg ml-4 mr-4 p-4 rounded-1xl ">
            <p className="font-semibold text-l">Average Performance</p>
          </div>
          <div className="h-300 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg ml-4 mr-4 p-4 rounded-1xl">
            <p className="font-semibold text-l">Salaries</p>
          </div>
        </div>
        <div className="h-300 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg mt-3 ml-4 mr-4 p-4 rounded-1xll">
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
            <Inject services={[Search, Page, Toolbar]} />
          </GridComponent>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
