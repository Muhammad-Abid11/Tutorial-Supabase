import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import AuthForm from '../components/AuthForm';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else navigate('/tasks');
  };

  return <AuthForm type="login" onSubmit={handleLogin} />;
};

export default Login;
//1 auth
