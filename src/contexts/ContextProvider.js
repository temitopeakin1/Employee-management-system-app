import { createContext, useContext, useState } from "react";

const StateContext = createContext();

const initialState = {
  chat: false,
  userProfile: false,
  notification: false,
  employeesData: [],
};

// children to take many context value
export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [hoverColor, setHoverColor] = useState('orange')
  const [currentColor, setCurrentColor] = useState("#000000");
  const [currentMode, setCurrentMode] = useState("light");
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [employeesData, setEmployeesData] = useState([]);


  const setMode = (mode) => {  
    setCurrentMode(mode);
    localStorage.setItem("themeMode", mode);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
  };

  const handleClick = (clicked) =>
    setIsClicked({ ...initialState, [clicked]: true }
  );

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
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
