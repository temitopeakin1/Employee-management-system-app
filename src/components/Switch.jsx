import React from 'react'
import ReactSwitch from 'react-switch'
import { useStateContext } from '../contexts/ContextProvider'

const Switch = () => {
  const { currentMode, setMode } = useStateContext();

  const toggleTheme = () => {
    const newMode = currentMode === 'light' ? 'dark' : 'light' // Toggle between light and dark mode
    setMode(newMode) 
  }
  return (
    <div className="items-end">
      <ReactSwitch
        checked={currentMode === 'dark'} 
        onChange={toggleTheme}
        onColor="#333333" 
        offColor="#e37715" 
        uncheckedIcon={false} 
        checkedIcon={false} 
      />
    </div>
  )
}

export default Switch
