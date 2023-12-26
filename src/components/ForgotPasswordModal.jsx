import React, { useState } from 'react'
import logo from '../assets/logo.svg'
import { useNavigate } from 'react-router-dom'

const ForgotPasswordModal = ({ isOpen, onCancel }) => {
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const [email, setEmail] = useState('')
  const [showModal, setShowModal] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    setErrors({})
  }

  const handleCloseModal = () => {
    setShowModal(!showModal);
    console.log('Modal close')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newErrors = {}

    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Invalid email format'
    }

    if (Object.keys(newErrors).length === 0) {
      navigate('/recoverPassword')
    }

    setErrors(newErrors)
  }

  return (
    <div className={`modal-overlay ${showModal ? 'visible' : ''}`}>
      <div className="modal fixed inset-0 flex items-center justify-center z-100">
        <div class="bg-white p-4 w-500 h-512 rounded-2xl shadow-lg flex flex-col px-8">
          <div className="flex items-center">
            <img
              src={logo}
              alt="Logo"
              style={{ height: '50px', marginTop: '50px' }}
            />
            <button
              type="button"
              className="absolute text-gray-400"
              style={{
                marginTop: '-40px',
                marginLeft: '170px',
                fontSize: '20px',
                fontWeight: '10',
                backgroundColor: 'transparent',
              }}
              onClick={handleCloseModal}
              aria-label="Close"
            >
              X
            </button>
          </div>
          <div
            className="mt-8 font-satoshi"
            style={{
              fontSize: '24px',
              fontWeight: '700',
              lineHeight: '31.2px',
            }}
          >
            Reset your password
          </div>
          <div
            className="mt-4 font-satoshi text-gray-500"
            style={{ fontWeight: '400', fontSize: '16px', lineHeight: '24px' }}
          >
            Enter the password associated with your account and <br /> we'll
            send you a link to reset your password
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-8">
              <input
                type="email"
                name="email"
                Id="email"
                value={email}
                placeholder="Email"
                onChange={handleEmailChange}
                className="border-gray-700 p-4 rounded-md w-full bg-gray-50"
              />
              {errors.email && (
                <div className="text-red text-sm">{errors.email}</div>
              )}
            </div>
            <a
              href="/login"
              className="mt-8 text-14 font-semibold"
              style={{ color: '#F08337' }}
            >
              Return to Login
            </a>
            <button
              onClick={handleSubmit}
              className="font-satoshi p-4 font-normal text-white mt-12 px-48 rounded-xl"
              style={{ backgroundColor: '#F08337', paddingRight: '180px' }}
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordModal
