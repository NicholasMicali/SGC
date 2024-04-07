import React, { useState } from 'react';
import { doSignInWithEmailAndPassword, doSignInWithGoogle, } from '../../firebase/auth';
import { useAuth } from '../../auth/index';
import { Navigate, Link } from 'react-router-dom';


const Login = () => {
  const userLoggedIn = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault()
    if(!isSigningIn) {
      setIsSigningIn(true);
      await doSignInWithEmailAndPassword(email, password);
    }
  }

  const onGoogleSignIn = (e) => {
    e.preventDefault();
    if(!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle().catch(err => {
        setIsSigningIn(false);
        setErrMessage(err);
      })
    }
  }

  const handleToggle = () => {
    setToggle(!toggle);
  }

  return (
    <div>
      {userLoggedIn && (<Navigate to={"/home"} replace={true} />)}
      <form onSubmit={onSubmit}>
        <h1>Login</h1>
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
        <button type="submit" disabled={isSigningIn}>
          Login
        </button>
        <button type="button" onClick={onGoogleSignIn} disabled={isSigningIn}>
          Login with Google
        </button>
      </form>
      <div>
        {errMessage ? errMessage : ''}
      </div>
    </div>
  )
}
export default Login;

