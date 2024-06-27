import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { links } from '../data/dummy'
import { useStateContext } from '../contexts/ContextProvider'
import logoo from '../assets/logoo.png'

const Sidebar = () => {
  const { currentColor, activeMenu } = useStateContext()

  //  dynamically capture the current year
  const getYear = () => {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    return currentYear
  }

  const activeLink =
    'flex items-center gap-2 pl-2 pt-2 pb-2 mt-2  rounded-lg  text-white text-12'
  const normalLink =
    'flex items-center gap-2 pl-2 pt-2 pb-2 mt-2 rounded-lg text-12 text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-hover'

  return (
    <div className="ml-4 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto">
      {activeMenu && (
        <>
          <div className="flex items-center justify-center">
            <Link to="/" className="mt-3">
              <img src={logoo} alt="Logo" style={{ height: '150px', width: '150px' }} />
            </Link>
          </div>
          <div className="mt-[-20px] ">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-10">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {link.icon}
                    <span className="capitalize ">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
          <p className="text-white font-copy text-12 mt-10">
            <a href="https://dynastytechglobal.com">© Dynasty Technologies {getYear()}</a>
          </p>
        </>
      )}
    </div>
  )
}

export default Sidebar
