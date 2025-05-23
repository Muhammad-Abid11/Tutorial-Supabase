import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import AuthForm from '../components/AuthForm';

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async (email, password) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else {
      alert('Check your email to confirm your signup!');
      navigate('/');
    }
  };

  return (
    <div>
      <AuthForm type="signup" onSubmit={handleSignup} />
      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
