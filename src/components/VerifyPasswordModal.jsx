import { useState } from 'react'
import logo from '../assets/logo.svg'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const VerifyPasswordModal = ({ showModal, onCancel }) => {
  const [email, setEmail] = useState('')
  const [otpDigits, setOtpDigits] = useState("");
  const navigate = useNavigate()
  const handleCancelButton = () => {
    onCancel(!showModal)
  }

  const handleChange = (index, value) => {
    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value;
    setOtpDigits(newOtpDigits);
  };

   const handleSubmit = () => {
    const otp = otpDigits.join('');
    console.log('Submitted OTP:', otp);
    // Add logic to handle the OTP submission
    navigate('/verifyPassword');
  };

  return (
    <div className={`modal-overlay ${showModal ? 'visible' : ''}`}>
      <div className="modal fixed inset-0 flex items-center justify-center z-100">
        <div class="bg-white p-4 w-450 h-600 rounded-2xl shadow-lg flex flex-col px-8">
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
              onClick={handleCancelButton}
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
            Enter Verification Code
          </div>
          <div
            className="mt-4 font-satoshi text-gray-500"
            style={{ fontWeight: '400', fontSize: '16px', lineHeight: '24px' }}
          >
            We have just sent a verification code to <br /> {email}
          </div>
          <div className="mt-4 flex justify-between">
            {otpDigits.map((index, digit) => (
              <input
                key={index}
                type="text"
                className="otpInput"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                // onKeyUp={handleKeyUp}
              />
            ))}
          </div>
          <a
            href="/login"
            className="mt-16 text-14 font-semibold"
            style={{ color: '#F08337' }}
          >
            Send the code again
          </a>
          <Link
            to={ handleSubmit}
            className="font-satoshi p-4 font-normal text-white mt-12 px-48 rounded-xl "
            style={{ backgroundColor: '#F08337' }}
          >
            Verify
          </Link>
        </div>
      </div>
    </div>
  )
}

export default VerifyPasswordModal
