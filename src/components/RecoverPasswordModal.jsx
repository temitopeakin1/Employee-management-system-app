import React, {useState} from 'react'
import logo from '../assets/logo.svg'
import { useNavigate, Link } from 'react-router-dom'


const RecoverPasswordModal = ({ isOpen, onCancel }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate()

  const handleCloseModal = () => {
    setShowModal(!showModal);
    console.log('Modal closed');
  };

  const handleSubmit = () => {
    navigate('/verifyPassword')
  }

  return (
    <div className={`modal-overlay ${showModal ? 'visible' : ''}`}>
     
        <div className="modal fixed inset-0 flex items-center justify-center z-100">
          <div className="bg-white p-4 w-500 h-400 rounded-2xl shadow-lg flex flex-col px-8">
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
              Recover Password
            </div>
            <div
              className="mt-4 font-satoshi text-gray-500"
              style={{
                fontWeight: '400',
                fontSize: '16px',
                lineHeight: '24px',
              }}
            >
              An Email has been sent to test@test.com. You'll <br /> receive
              instructions on how to set a new password
            </div>
            <Link
              to="/verifyPassword"
              className="font-satoshi p-4 font-normal text-white mt-4 px-36 rounded-xl "
              style={{ backgroundColor: '#F08337', whiteSpace: 'nowrap' }}
            >
              Resend E-mail Link
            </Link>

            <a
              href="/login"
              className="mt-8 text-14 font-semibold"
              style={{ color: '#F08337' }}
            >
              Return to Login
            </a>
          </div>
        </div>
    
    </div>
  )
}

export default RecoverPasswordModal
