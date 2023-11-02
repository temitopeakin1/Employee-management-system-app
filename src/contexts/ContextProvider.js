import React, { createContext, useContext, useState } from 'react'

// create a context
const StateContext = createContext('')

const initialState = {
  chat: false,
  userProfile: false,
  notification: false,
  employeesData: [],
}

export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined)
  const [hoverColor, setHoverColor] = useState('orange')
  const [currentColor, setCurrentColor] = useState('#0000FF')
  const [currentMode, setCurrentMode] = useState('light')
  const [themeSettings, setThemeSettings] = useState(false)
  const [activeMenu, setActiveMenu] = useState(true)
  const [isClicked, setIsClicked] = useState(initialState)
  const [employeesData, setEmployeesData] = useState([])
  const [empName, setEmpName] = useState('')
  const [company, setCompany] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [contractEndDate, setContractEndDate] = useState('')
  const [contractStartDate, setContractStartDate] = useState('')
  const [projectName, setProjectName] = useState('')
  const [currency, setCurrency] = useState('NGN')
  const [currentStep, setCurrentStep] = useState(1)

  const setMode = (e) => {
    setCurrentMode(e.target.value)
    localStorage.setItem('themeMode', e.target.value)
  }

  const setColor = (color) => {
    setCurrentColor(color)
    localStorage.setItem('colorMode', color)
  }

  const handleClick = (clicked) =>
    setIsClicked({ ...initialState, [clicked]: true })

  const handleNext = () => {
    setCurrentStep(currentStep + 1)
    if (currentStep === 1) {
    }
  }
  
  // set states
  const handleEmpNameChange = (e) => {
    setEmpName(e.target.value)
  }

  const handleCompanyChange = (e) => {
    setCompany(e.target.value)
  }

  const handleJobChange = (e) => {
    setJobTitle(e.target.value)
  }

  const handleProjectNameChange = (e) => {
    setProjectName(e.target.value)
  }

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value)
  }

  return (
    <StateContext.Provider
      value={{
        hoverColor,
        setHoverColor,
        currentColor,
        currentMode,
        activeMenu,
        screenSize,
        setScreenSize,
        handleClick,
        isClicked,
        initialState,
        setIsClicked,
        setActiveMenu,
        setCurrentColor,
        setCurrentMode,
        setMode,
        setColor,
        themeSettings,
        setThemeSettings,
        employeesData, // Include employee data in the context
        setEmployeesData, // Include employee data setter function in the context
        empName,
        setEmpName,
        company,
        setCompany,
        jobTitle,
        setJobTitle,
        contractEndDate,
        setContractEndDate,
        contractStartDate,
        setContractStartDate,
        projectName,
        setProjectName,
        currency,
        setCurrency,
        currentStep,
        setCurrentStep,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
