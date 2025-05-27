import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async () => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setMessage(`❌ ${error.message}`);
    } else {
      setMessage('✅ Password updated! You can now log in.');
      setTimeout(() => navigate('/'), 2000);
    }
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        width: '90%', // ensures responsiveness
        margin: '40px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
        boxSizing: 'border-box', // ensures padding is included in width
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Set a New Password</h2>
      <input
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '15px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          boxSizing: 'border-box',
        }}
      />
      <button
        onClick={handleResetPassword}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#28a745',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Update Password
      </button>
      {message && (
        <p
          style={{
            marginTop: '15px',
            color: message.startsWith('❌') ? 'red' : 'green',
            textAlign: 'center',
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default ResetPassword;
