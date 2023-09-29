import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  })

  const navigate = useNavigate()
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Your Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    if (formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword = 'Passwords do not match'
    }

    if (Object.keys(newErrors).length === 0) {
      navigate('/login') // Form is valid, redirect to the login page
    }

    setErrors(newErrors)
    if (
      newErrors.name === '' &&
      newErrors.email === '' &&
      newErrors.password === '' &&
      newErrors.repeatPassword === ''
    ) {
      axios
        .post('http://localhost:8081/hampshirecrm', formData)
        .then((res) => {
          navigate('/login')
        })

        .catch((err) => console.log(err))
    }
  }

  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-black text-white p-10 flex items-center justify-center">
        <div className="pl-18">
          <img src={logo} alt="Logo" style={{ height: '35px' }} />
          <p className="text-lg font-semibold mt-4 pr-72">
            Artificial Intelligence
            <br />
            Solution for your
            <br />
            business
          </p>
          <p className="text-sm mt-4">
            Hampshire Heights creates products that let people do things
            differently
          </p>
        </div>
      </div>
      <div className="flex-1 bg-white text-black p-10 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4 mt-8">
            <strong>Let's get started with creating an account</strong>
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block font-semibold">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-2/3 rounded-md"
              />
              {errors.name && (
                <div className="text-red-500 text-sm">{errors.name}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your email address"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-2/3 rounded-md"
              />
              {errors.email && (
                <div className="text-red-500 text-sm">{errors.email}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block font-semibold">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                value={formData.password}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-2/3 rounded-md"
              />
              {errors.password && (
                <div className="text-red-500 text-sm">{errors.password}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="repeatPassword" className="block font-semibold">
                Repeat Password
              </label>
              <input
                type="password"
                name="repeatPassword"
                id="repeatPassword"
                placeholder="Repeat Password"
                value={formData.repeatPassword}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-2/3 rounded-md"
              />
              {errors.repeatPassword && (
                <div className="text-red-500 text-sm">
                  {errors.repeatPassword}
                </div>
              )}
            </div>
            <div className="mb-4 flex flex-col">
              <button
                onClick={handleSubmit}
                className="bg-orange-500 text-white p-2 w-2/3 rounded-md"
              >
                Register
              </button>
              <p className="text-sm mt-1 p-2 w-2/3">
                Already have an account?{' '}
                <Link to="/login" className="text-orange-500 text-sm font-semibold">
                  Login here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
