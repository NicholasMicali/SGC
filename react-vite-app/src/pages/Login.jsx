import React, { useState } from 'react';
import Login from '../components/auth/login';
import SignUp from '../components/auth/signup';

const LoginPage = () => {

  const [toggle, setToggle] = useState(true);

  const handleToggle = () => {
    setToggle(!toggle);
  }

  return (
    <>
      {toggle ? 
        <div>
          <Login/> 
          <button onClick={handleToggle}>
            Don't have an account?
          </button>
        </div>
      : 
        <div>
          <SignUp/>
          <button onClick={handleToggle}>
            Already have an account?
          </button>
        </div>
      }
    </>
  );
};

export default LoginPage;