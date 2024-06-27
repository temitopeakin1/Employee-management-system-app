import React, { useState } from 'react'
import logoo from '../assets/logoo.png'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { BiArrowBack } from 'react-icons/bi'
import Privacy from "../components/shared/privacy"

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
          <img src={logoo} alt="Logo" style={{ height: '100px', width: '100px' }} />
          <p className="text-45 font-semibold mt-2 pr-50">
            <span className="gradient-text">Artificial Intelligence</span>
            <br />
            Solution for your
            <br />
            Business
          </p>
          <p className="text-sm mt-4">
            Dynasty Tech creates products that let people do things
            differently
          </p>
        </div>
      </div>

      <div className="flex-1 bg-white text-black p-10 flex items-center justify-center">
        <div className="icon">
            <BiArrowBack
              onClick={() => navigate(-1)}
              style={{ cursor: 'pointer', marginRight: '10px' }}
            />
            <h2 className="text-2xl mb-4 font-satoshi font-semibold ml-.5 mt-4">
            Let's get started with <br/>creating an account
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
                className="border border-gray-300 p-2 w-2/3 rounded-md text-14 font-satoshi"
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
                className="border border-gray-300 p-2 w-2/3 rounded-md text-14 font-satoshi"
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
                  className="border border-gray-300 p-2 w-2/3 rounded-md text-14 font-satoshi"
                />

                <btn
                  type="btn"
                  onClick={handlePasswordVisibility}
                  className="absolute ml-72 pl-4 mt-2.5"
                  style={{ color: '#000000' }}
                >
                  {passwordVisibility ? (
                    <AiOutlineEye />
                  ) : (
                    <AiOutlineEyeInvisible />
                  )}
                </btn>
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
                  className="border border-gray-300 p-2 w-2/3 rounded-md text-14 font-satoshi"
                />
                <btn
                  type="btn"
                  onClick={handleRepeatPasswordVisibility}
                  className="absolute ml-72 pl-4 mt-2.5"
                  style={{ color: 'black' }}
                >
                  {passwordVisibility ? (
                    <AiOutlineEye />
                  ) : (
                    <AiOutlineEyeInvisible />
                  )}
                </btn>
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
                className="bg-orange-500 text-white p-2 w-2/3 -mt-2 rounded-md text-14 font-satoshi"
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
             <Privacy />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
