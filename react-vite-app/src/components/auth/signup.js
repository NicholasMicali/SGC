import React, { useState } from 'react';
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth';
import { useAuth } from '../../firebase/auth';


const SignUp = () => {
  const userLoggedIn = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState('');


  const onSubmit = async (e) => {
    e.preventDefault()
    if(!isSiginingUp) {
      setIsSigningUp(true);
      await doCreateUserWithEmailAndPassword(email, password);
    }
  }


  return (
    <div>
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
        <button type="submit" disabled={isSigningIn}>
          Sign Up
        </button>
      </form>
    </div>
  )
}
export default SignUp;
