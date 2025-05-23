import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const MagicLinkAuth = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleMagicLinkLogin = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setError(error.message);
    } else {
      setMessage('✅ Magic link sent! Check your inbox.');
    }
  };

  return (
    <div
    style={{
        maxWidth: '400px',
        margin: '30px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
      }}
    >
      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Magic Link Login</h3>
      <form onSubmit={handleMagicLinkLogin}>
      <input
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
        <button type="submit" style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '10px',
        }}>Send Magic Link</button>
      </form>
      {message && <p style={{ color: 'green', textAlign: 'center', marginTop: '15px' }}>{message}</p>}
      {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '15px' }}>{error}</p>}
    </div>
  );
};

export default MagicLinkAuth;

/* 

✨ What is Magic Link Auth?
Magic link authentication lets users log in using a one-time email link — no password required. Users enter their email, and Supabase sends them a secure login link.

✅ Super user-friendly
✅ Passwordless
✅ Great for reducing friction in signups/logins


🛠 Step-by-Step Implementation
🔧 Step 1: Enable Magic Link in Supabase
Go to Supabase Dashboard

Go to Authentication → Email Auth

Under "Email sign-ins", check:

✅ Enable "Magic Link sign-in"

✅ Enable "Confirm email"

Save changes

📩 Customize the email content in Supabase → Auth → Templates 
https://supabase.com/dashboard/project/iikvavyghoxdfjmedpce/auth/templates

*/