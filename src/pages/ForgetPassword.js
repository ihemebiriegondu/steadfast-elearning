import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { BsFillExclamationCircleFill } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import { GrFacebookOption } from 'react-icons/gr'
import { BsApple } from 'react-icons/bs'
import { Alert } from 'react-bootstrap';

import { useUserAuth } from '../context/UserAuthContext';

import '../css/forgetpassword.css'

const ForgetPassword = () => {

  const [email, setEmail] = useState('')
  const [error, setError] = useState('');
  const { facebookSignUp, googleSignIn, forgetpassword } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("");

    try {
      await forgetpassword(email);
      sessionStorage.setItem('resetEmail', email);
      navigate('/forgetpasswordcode')
    } catch (err) {
      if (err.code === 'auth/invalid-email') {
        setError('Invalid email address')
      } else if (err.code === "auth/missing-email") {
        setError('Missing email address')
      } else if (err.code === 'auth/user-not-found') {
        setError('User not found')
      } else if (err.code === 'auth/operation-not-allowed') {
        setError('Operation not allowed')
      } else {
        setError(err.message);
      }
    }
  }

  const handleGoogleSignIn = async (e) => {
    try {
      await googleSignIn();
      navigate("/dashboard");
    }
    catch (err) {
      if (err.code === 'auth/invalid-email') {
        setError('Invalid email address')
      } else if (err.code === 'auth/user-disabled') {
        setError('User disabled')
      } else if (err.code === 'auth/user-not-found') {
        setError('User not found')
      } else if (err.code === 'auth/internal-error') {
        setError('Invalid Student ID')
      } else if (err.code === "auth/missing-email") {
        setError('Missing email address')
      } else if (err.code === 'auth/wrong-password') {
        setError('Wrong Student ID')
      } else if (err.code === 'auth/operation-not-allowed') {
        setError('Operation not allowed')
      } else {
        setError(err.message);
      }
    }
  }

  const handleFbSignIn = async (e) => {
    try {
      await facebookSignUp();
      navigate("/dashboard");
    }
    catch (err) {
      if (err.code === 'auth/invalid-email') {
        setError('Invalid email address')
      } else if (err.code === 'auth/user-disabled') {
        setError('User disabled')
      } else if (err.code === 'auth/user-not-found') {
        setError('User not found')
      } else if (err.code === 'auth/internal-error') {
        setError('Invalid Student ID')
      } else if (err.code === "auth/missing-email") {
        setError('Missing email address')
      } else if (err.code === 'auth/wrong-password') {
        setError('Wrong Student ID')
      } else if (err.code === 'auth/operation-not-allowed') {
        setError('Operation not allowed')
      } else {
        setError(err.message);
      }
    }
  }

  const handleAppleSignIn = async (e) => {

  }


  return (
    <div className='forgetPasswordDiv'>
      <h1 className='mx-auto text-center mb-5'>Forgot Password</h1>
      <div className='sizeable mx-auto'>
        <form className='pb-4' onSubmit={(e) => { handleSubmit(e) }} id='signup-form'>
          <div className='d-flex flex-column'>
            <label htmlFor='email' className='text-center mb-3'>Enter Email Address: </label>
            <input id='email' name='email' type='email' placeholder='example@gmail.com' onChange={(e) => { setEmail(e.target.value) }}></input>
          </div>
          <button>Send</button>
        </form>
      </div>

      <div className='otherLoginOpt'>
        <div className='d-flex justify-content-center align-items-center loginOpts'>
          <div className='loginOptDiv mx-1 px-3 py-1 shadow' onClick={() => { handleAppleSignIn() }}><BsApple className='loginOpt mb-1' /></div>
          <div className='loginOptDiv mx-1 px-3 py-1 shadow' onClick={() => { handleFbSignIn() }}><GrFacebookOption className='loginOpt mb-1 opt2' /></div>
          <div className='loginOptDiv mx-1 px-3 py-1 shadow' onClick={() => { handleGoogleSignIn() }}><FcGoogle className='loginOpt mb-1' /></div>
        </div>
        <div className='create d-flex justify-content-center align-items-baseline'>
          <p className='mb-0 me-2'>Don't have an account?</p>
          <span><Link className='link' to={'/create account'}>SignUp</Link></span>
        </div>
      </div>

      <div className='copyright'>
        <a href='https://steadfast-private-school.netlify.app/' target='_blank' rel="noreferrer" className='mx-auto text-center w-100'>© Steadfast Private Schools</a>
      </div>

      <div className='error-div'>
        {error && <Alert variant='danger' className='error'><BsFillExclamationCircleFill className='text-danger me-4 fs-4' />{error}</Alert>}
      </div>
    </div>
  )
}

export default ForgetPassword