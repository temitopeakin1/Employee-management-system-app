import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { BiArrowBack } from 'react-icons/bi'

const Register = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const [repeatPasswordVisibility, setRepeatPasswordVisibility] = useState(
    false,
  )

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

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility)
  }

  const handleRepeatPasswordVisibility = () => {
    setRepeatPasswordVisibility(!repeatPasswordVisibility)
  }
  // validations for register page
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
  }

  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-black text-white p-10 flex items-center justify-center">
        <div className="pl-18">
          <img src={logo} alt="Logo" style={{ height: '35px' }} />
          <p className="text-45 font-semibold mt-4 pr-50">
            <span className="gradient-text">Artificial Intelligence</span>
            <br />
            Solution for your
            <br />
            Business
          </p>
          <p className="text-sm mt-4">
            Hampshire Heights creates products that let people do things
            differently
          </p>
        </div>
      </div>

      <div className="flex-1 bg-white text-black p-10 flex items-center justify-center">
        <div className="-mt-96 ml-2">
          <BiArrowBack onClick={() => navigate(-1)} style={{cursor: 'pointer'}} />
        </div>
        <div className="text">
          <h2 className="text-2xl mb-4 font-satoshi font-semibold ml-.5 mt-8">
            Let's get started with
          </h2>
          <h2 className="text-2xl mb-4 font-satoshi font-semibold ml-.5 -mt-4">
            creating account
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="font-satoshi text-gray-400">
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
              <label htmlFor="email" className="font-satoshi text-gray-400">
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
              <label htmlFor="password" className="font-satoshi text-gray-400">
                Password
              </label>
              <div className="flex">
                <input
                  type={passwordVisibility ? 'text' : 'password'}
                  name="password"
                  id="password"
                  placeholder="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 w-2/3 rounded-md pr-10"
                />

                <button
                  type="button"
                  onClick={handlePasswordVisibility}
                  className="absolute mt-3 ml-16 pl-70"
                  style={{ color: 'black' }}
                >
                  {passwordVisibility ? (
                    <AiOutlineEye />
                  ) : (
                    <AiOutlineEyeInvisible />
                  )}
                </button>
              </div>
              {errors.password && (
                <div className="text-red-500 text-sm">{errors.password}</div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="repeatPassword"
                className="font-satoshi text-gray-400"
              >
                Repeat Password
              </label>
              <div className="flex">
                <input
                  type={repeatPasswordVisibility ? 'text' : 'password'}
                  name="repeatPassword"
                  id="repeatPassword"
                  placeholder="Repeat Password"
                  value={formData.repeatPassword}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 w-2/3 rounded-md"
                />
                <button
                  type="button"
                  onClick={handleRepeatPasswordVisibility}
                  className="absolute mt-3 ml-16 pl-70"
                  style={{ color: 'black' }}
                >
                  {passwordVisibility ? (
                    <AiOutlineEye />
                  ) : (
                    <AiOutlineEyeInvisible />
                  )}
                </button>
              </div>
              {errors.repeatPassword && (
                <div className="text-red-500 text-sm">
                  {errors.repeatPassword}
                </div>
              )}
            </div>
            <div className="mb-4 flex flex-col">
              <button
                onClick={handleSubmit}
                className="bg-orange-500 text-white p-2 w-2/3 -mt-2 rounded-md"
              >
                Register
              </button>
              <p className="text-sm mt-1 p-2 w-2/3 text-center">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-orange-500 text-sm font-semibold"
                >
                  Login here
                </Link>
              </p>
              <p className="text-sm mr-12 mt-8 font-copy">
                &copy;Copyright 2023 All rights reserved,
                <Link to="#" className="text-orange-500 text-sm font-semibold">
                  Term & Condition{' '}
                </Link>{' '}
                |{' '}
                <Link to="#" className="text-orange-500 text-sm font-semibold">
                  Privacy & Policy
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
