import React, { useState } from 'react';
import { doSignInWithEmailAndPassword, doSignInWithGoogle, } from '../../firebase/auth.js';
import { useAuth } from '../../auth/index';
import { Navigate } from 'react-router-dom';
import LoginSignupButton from './loginSignupButton.jsx';
import GoogleButton from './googleButton.jsx';
import CustomInput from './customInput.jsx';
import GoogleIcon from "../../assets/google_icon.svg";

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
    <div className=' h-screen flex flex-col justify-evenly items-center'>
      {userLoggedIn && (<Navigate to={"/home"} replace={true} />)}
      <div className=' '>
        <p>LOGO</p>
        <h1>Login</h1>
      </div>
      <div className='flex justify-between items-center w-full'>
        <LoginSignupButton color='rgba(254, 179, 209, 1)' colorOnSelect='rgba(254, 135, 183, 1)' text='Login' onClick={() => console.log('login')} />
        <LoginSignupButton color='rgba(209, 237, 249, 1)' colorOnSelect='rgba(141, 211, 239, 1)' text='Signup' onClick={() => console.log('signup')} />
      </div>

      <GoogleButton text='Login with Google' onClick={onGoogleSignIn} icon={GoogleIcon} />
      <div className='w-full flex items-center'>
        <hr className="w-full " />
        <div className="text-gray-500 ml-5 mr-5">OR</div>
        <hr className="w-full" />
      </div>
      <form onSubmit={onSubmit} className='w-full flex flex-col gap-5'>
        <CustomInput type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} id='email' labelName='Email' />
        <CustomInput type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} id='password' labelName='Password' />
        <small> By creating an account, you agree to the Terms of Service and Privacy Policy</small>
        <button type="submit" disabled={isSigningIn} className='  bg-gradient-to-tr rounded-xl p-2 text-white from-gradient-start via-gradient-mid to-gradient-end'>
          Log In
        </button>
      </form>
      <div>
        {errMessage ? errMessage : ''}
      </div>
    </div>
  )
}
export default Login;

