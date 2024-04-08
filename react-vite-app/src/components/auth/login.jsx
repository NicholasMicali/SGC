import React, { useState } from 'react';
import { doSignInWithEmailAndPassword, doSignInWithGoogle, } from '../../firebase/auth.js';
import { useAuth } from '../../auth/index';
import { Navigate } from 'react-router-dom';


const Login = () => {
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault()
    if(!isSigningIn) {
      //setIsSigningIn(true);
      try {
        const user = await doSignInWithEmailAndPassword(email, password);
      } catch (error) {
      // Handle errors here, such as displaying a message to the user
        console.error('Login failed:', error);
        alert('Failed to log in: ' + error.message);
        return;
      }
      setIsSigningIn(true);
      //console.log("User signed in: " + user);
    }
  }

  const onGoogleSignIn = (e) => {
    e.preventDefault();
    if(!isSigningIn) {
      const user = doSignInWithGoogle().catch(err => {
        setErrMessage(err);
        console.error('Login with google failed:', err);
        alert('Failed to login with google:', err.message);
      })
      setIsSigningIn(true);
    }
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

