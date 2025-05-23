import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import AuthForm from '../components/AuthForm';
import MagicLinkAuth from '../components/MagicLinkAuth';
import GoogleAuth from '../components/GoogleAuth';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else navigate('/tasks');
  };

  // Auth Session Check
  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        navigate('/tasks');
        return;
      }
    };

    getSession();
  }, []);

  return (
  <>
    <div>
      <AuthForm type="login" onSubmit={handleLogin} />
      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
    <MagicLinkAuth />
    <hr />
    <GoogleAuth />
  </>
  );
};

export default Login;
