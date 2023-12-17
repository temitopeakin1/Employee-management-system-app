import React from 'react'
import { Button } from '.'
import { userProfileData } from '../data/dummy'
import ReactSwitch from 'react-switch';
// import { useStateContext } from '../contexts/ContextProvider';

const UserProfile = ({ userImage }) => {
  // const { currentColor } = useStateContext();
  // const [name, setName] = useState("");

  const hasLogout = userProfileData.some((item) => item.title === 'Logout')

  return (
    <div
      className={`nav-item absolute right-5 top-16 bg-white p-8 rounded-xl w-70 ${
        hasLogout ? 'border border-gray-500' : ''
      }`}
    >
      <div className="items-center border-color -ml-4 -mr-4 border-b-1 pb-1">
        <p className="font-semibold font-satoshi text-16 dark:text-gray-200">
          lorem ipsum
        </p>
        <p className="text-gray-500 font-copy text-sm dark:text-gray-200">
          Admin Account
        </p>
      </div>
   
        {userProfileData.map((item, index) => (
          <div
            key={index}
            className="flex p-2 hover:bg-light-gray text-14 cursor-pointer font-copy"
          >
            <button
              type="button"
              style={{ color: item.iconColor }}
              className="text-xl -mt-4 rounded-lg p-3 hover:bg-light-gray"
            >
              {item.icon}
            </button>
            <div className="pl-2">
              {item.title === 'Logout' && (
                <p
                  className="font-semibold dark:text-gray-200"
                  style={{ color: '#D02F44' }}
                >
                  {item.title}
                </p>
              )}
              {item.title !== 'Logout' && (
                <p className="font-semibold dark:text-gray-200">{item.title}</p>
              )}
            </div>
          </div>
        ))}
        <div className="md:items-center -ml-4 -mr-4 border-color border-b-1"></div>
        <div className="flex md:items-center space-x-12 -ml-4 -mr-4 font-copy mt-2">
          <div className="font-bold font-copy text-14 dark:text-gray-600 mb-2">Dark mode</div>
          <div className="items-end">
          <ReactSwitch />
          </div>
        </div>
      
    </div>
  )
}

export default UserProfile
