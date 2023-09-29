import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    if (Object.keys(newErrors).length === 0) {
      navigate('/dashboard')
    }

    setErrors(newErrors)
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
              <label htmlFor="email" className="block font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
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
                value={formData.password}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-2/3 rounded-md"
              />
              {errors.password && (
                <div className="text-red-500 text-sm">{errors.password}</div>
              )}
            </div>

            <div className="mb-4 flex flex-col">
              <button
                onClick={handleSubmit}
                className="bg-orange-500 text-white p-2 w-2/3 rounded-md"
              >
                Login
              </button>
              <p className="text-sm mt-1 p-2 w-2/3">
                Don't have an account?{' '}
                <a href="/register" className="text-orange-500 text-sm font-semibold">
                  Register here
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
