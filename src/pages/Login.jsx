import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import AuthForm from '../components/AuthForm';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else navigate('/tasks');
  };

  return (
    <div>
      <AuthForm type="login" onSubmit={handleLogin} />
      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
