import React, { useState } from 'react';
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth';
import { useAuth } from '../../auth/index';
import { Navigate, Link } from 'react-router-dom';


const SignUp = () => {
  const userLoggedIn = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [errMessage, setErrMessage] = useState('');


  const onSubmit = async (e) => {
    e.preventDefault()
    if(!isSigningUp) {
      setIsSigningUp(true);
      await doCreateUserWithEmailAndPassword(email, password);
    }
  }


  return (
    <div>
      {userLoggedIn && (<Navigate to={"/home"} replace={true} />)}
      <form onSubmit={onSubmit}>
        <h1>Sign Up</h1>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={isSigningUp}>
          Sign Up
        </button>
      </form>
      <div>
        {errMessage ? errMessage : ''}
      </div>
    </div>
  )
}
export default SignUp;
