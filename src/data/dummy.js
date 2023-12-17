import React from 'react'
import {
  AiOutlineCalendar,
  AiFillDashboard,
  AiOutlineBank,
} from 'react-icons/ai'
import {
  MdOutlinePerson,
  MdOutlineHelp,
  MdContactSupport,
} from 'react-icons/md'
import { FaRegUser } from "react-icons/fa";
import { IoIosContract } from 'react-icons/io'
import { SiStopstalk } from 'react-icons/si'
import { FaFileInvoice } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'
import { SiKnowledgebase } from 'react-icons/si'
import { BiLogOut } from 'react-icons/bi'
import avatar4 from './avatar4.jpg'

// sidebar menu links
export const links = [
  {
    title: 'MENU',
    links: [
      {
        name: 'dashboard',
        icon: <AiFillDashboard />,
      },
      {
        name: 'Employees',
        icon: <MdOutlinePerson />,
      },
      {
        name: 'Departments',
        icon: <AiOutlineBank />,
      },
      {
        name: 'Contracts',
        icon: <IoIosContract />,
      },
      {
        name: 'Conversations',
        icon: <SiStopstalk />,
      },
      {
        name: 'Calendar',
        icon: <AiOutlineCalendar />,
      },
      {
        name: 'Payroll',
        icon: <FaFileInvoice />,
      },
      {
        name: 'Settings',
        icon: <FiSettings />,
      },
    ],
  },

  {
    title: 'SUPPORT',
    links: [
      {
        name: 'Need Help ?',
        icon: <MdOutlineHelp />,
      },
      {
        name: 'Contact Us',
        icon: <MdContactSupport />,
      },
      {
        name: 'Knowledge Base',
        icon: <SiKnowledgebase />,
      },
    ],
  },
]

export const themeColors = [
  {
    name: 'dark',
    color: '#000000',
  },
  {
    name: 'light',
    color: '#FFFFFF',
  },
]

export const departmentFilters = [
  'All Employees',
  'Marketing',
  'Accounting',
  'Human Resources',
  'IT Support',
  'Software Engineering',
]

export const designation = [
  { Id: '1', Role: 'Software Developer' },
  { Id: '2', Role: 'Frontend Engineer' },
  { Id: '3', Role: 'Backend Engineer' },
  { Id: '4', Role: 'FullStack Developer' },
  { Id: '5', Role: 'Product Designer' },
  { Id: '6', Role: 'Scrum Master' },
  { Id: '7', Role: 'Product Owner' },
  { Id: '8', Role: 'HR Manager' },
  { Id: '9', Role: 'Administrative Officer' },
  { Id: '10', Role: 'DevOps Engineer' },
  { Id: '11', Role: 'Social Media Manager' },
  { Id: '12', Role: 'Solutions Architect' },
]

export const department = [
  { Id: '1', Dept: 'Software Engineering', Color: 'software' },
  { Id: '2', Dept: 'Administrative', Color: 'administrative' },
  { Id: '3', Dept: 'Human Resources', Color: 'hr' },
]

export const empType = [
  { type: '1', Emp: 'FullTime' },
  { type: '2', Emp: 'Contract' },
  { type: '3', Emp: 'PartTime' },
  { type: '4', Emp: 'Intern' },
]

export const deptData = [
  { x: 'Software Engineering', employees: 20 },
  { x: 'Accounting', employees: 20 },
  { x: 'Marketing', employees: 20 },
  { x: 'Human Resources', employees: 20 },
  { x: 'IT Support', employees: 20 },
]

export const depatmentFilters = [
  'All Employees',
  'Marketing',
  'Accounting',
  'Human Resources',
  'IT Support',
  'Software Engineering',
]

export const chatData = [
  {
    image: avatar4,
    message: 'dummy message!',
    desc: 'hampshire notifications',
    time: '9:08 AM',
  },
  {
    image: avatar4,
    message: 'dummy message!',
    desc: 'hampshire notifications',
    time: '9:08 AM',
  },
]

export const userProfileData = [
  {
    icon: <FaRegUser />,
    title: 'My Profile',
    iconColor: 'rgb(128, 128, 128)',
  },
  {
    icon: <FiSettings />,
    title: 'Admin Settings',
    iconColor: 'rgb(128, 128, 128)',
  },
  {
    icon: <BiLogOut />,
    title: 'Logout',
    iconColor: '#D02F44'
  },
]

export const employeesData = [
  {
    EmployeeImage: avatar4,
    City: 'Lagos',
    Position: 'Software Developer',
    EmployeeID: 'HH001',
    Name: 'Akinmegha Temitope',
    PhoneNumber: '08112785465',
    Department: 'Software Engineering',
    Status: 'Contract',
  },

  {
    EmployeeImage: avatar4,
    City: 'Lagos',
    Position: 'Software Developer',
    EmployeeID: 'HH001',
    Name: 'Akinmegha Temitope',
    PhoneNumber: '08112785465',
    Department: 'Software Engineering',
    Status: 'Full Time',
  },

  {
    EmployeeImage: avatar4,
    City: 'Lagos',
    Position: 'Software Developer',
    EmployeeID: 'HH001',
    Name: 'Akinmegha Temitope',
    PhoneNumber: '08112785465',
    Department: 'Software Engineering',
    Status: 'Contract',
  },
]
// calender 
export const scheduleData = [
  {
    Id: 1,
    Subject: 'Some dummy',
  },
  {
    Id: 10,
    Subject: 'Dummy',
  },
  {
    Id: 10,
    Subject: 'Dummy',
  },
  {
    Id: 10,
    Subject: 'Dummy',
  },
  {
    Id: 10,
    Subject: 'Dummy',
  },
  {
    Id: 10,
    Subject: 'Dummy',
  },
  {
    Id: 10,
    Subject: 'Dummy',
  },
  {
    Id: 8,
    Subject: 'Dummy',
  },
  {
    Id: 9,
    Subject: 'Dummy',
  },
  {
    Id: 10,
    Subject: 'Dummy',
  },
  {
    Id: 10,
    Subject: 'Dummy',
  },
  {
    Id: 10,
    Subject: 'Dummy',
  },
  {
    Id: 10,
    Subject: 'Dummy',
  },
  {
    Id: 10,
    Subject: 'Dummy',
  },
  {
    Id: 10,
    Subject: 'Dummy',
  },
  {
    Id: 10,
    Subject: 'Dummy',
  },
]

export const dropdownData = [
  {
    Id: '1',
    Time: 'Oct 2023',
  },
  {
    Id: '2',
    Time: 'Nov 2023',
  },
  {
    Id: '3',
    Time: 'Dec 2023',
  },
]
