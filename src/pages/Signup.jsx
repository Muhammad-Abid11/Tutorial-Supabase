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

/* 
✅ Step 1: Create Supabase Project
Go to https://supabase.com

Create a new project

Go to Project Settings > API and copy:

SUPABASE_URL

SUPABASE_ANON_KEY

Go to Authentication > Settings and enable Email + Password
npx create-react-app supabase-todo
cd supabase-todo
npm install @supabase/supabase-js react-router-dom

*/
