import React from 'react';
import Login from '../components/auth/login';
import SignUp from '../components/auth/signup';

const LoginPage = () => {

  return (
    <>
      <div>
        Login Page!
      </div>
      <Login/>
      <SignUp/>
    </>
  );
};

export default LoginPage;