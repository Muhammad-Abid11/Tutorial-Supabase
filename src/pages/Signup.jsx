import React from 'react';
import { useNavigate } from 'react-router-dom';
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

  return <AuthForm type="signup" onSubmit={handleSignup} />;
};

export default Signup;
