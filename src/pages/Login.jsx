import React, { useState } from 'react'
import logoo from '../assets/logoo.png'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import Privacy from "../components/shared/privacy"

const Login = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleOpenModal = () => {
    setShowModal(true);
  }

  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  // store image URL in a local storage
  localStorage.setItem('userImage', 'path-to-user-image.jpg')

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target

    // updating the check box
    const newValue = type === 'checkbox' ? checked : value
    setFormData({
      ...formData,
      [name]: newValue,
    })
  }

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility)
    console.log('setpassword')
  }

  // handle submit events
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
// route to the dashboard once it validates the input
    if (Object.keys(newErrors).length === 0) {
      navigate('/dashboard')
    }

    setErrors(newErrors)
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex-1 bg-black text-white p-10 flex items-center justify-center">
        <div className="pl-18 md:pl-18">
          <img src={logoo} alt="Logo" style={{ height: '100px', width: '100px' }} />
          <p className="text-45 font-semibold mt-2 pr-50">
            <span className="gradient-text">Artificial Intelligence</span>
            <br />
            Solution for your
            <br />
            Business
          </p>
          <p className="text-sm mt-4">
            Dynasty tech creates products that let people do things
            differently
          </p>
        </div>
      </div>
      <div className="flex-1 bg-white text-black p-10 flex items-center justify-center">
        <div className="text">
          <h2 className="text-2xl mb-4 font-satoshi font-semibold ml-.5 mt-24">
            Let's Login to your
          </h2>
          <h2 className="text-2xl mb-4 font-satoshi font-semibold ml-.5 -mt-4">
            Dynasty Tech account
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="font-satoshi text-gray-400">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
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
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 w-2/3 rounded-md pr-10 text-14 font-satoshi"
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
            <div className="mb-4 flex md:items-center">
              <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="rememberMe" className="text-sm">
                Remember me
              </label>
              <Link
                to="/forgotPassword"
                onClick={handleOpenModal}
                className="text-orange-500 font-semibold inline-block mr-40"
                style={{ whiteSpace: 'nowrap' }}
              >
                Forgot password?
              </Link>
            </div>

            <div className="mb-4 flex flex-col">
              <button
                onClick={handleSubmit}
                className="bg-orange-500 text-white p-2 w-2/3 rounded-md"
              >
                Login
              </button>
              <p className="text-sm mt-1 p-2 w-2/3 text-center">
                Don't have an account?{' '}
                <a
                  href="/register"
                  className="text-orange-500 text-sm font-semibold"
                >
                  Register here
                </a>
              </p>
            </div>
          </form>
         <Privacy />
        </div>
      </div>
    </div>
  )
}

export default Login
