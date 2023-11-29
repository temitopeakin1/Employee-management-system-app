// ForgotPasswordModal.js
import React from 'react';

const ForgotPasswordModal = ({ onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onCancel}>
          X
        </button>
        <h2>Forgot Password</h2>
        {/* Add your forgot password content here */}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
