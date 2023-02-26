import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { BsFillExclamationCircleFill } from 'react-icons/bs'
import { Alert } from 'react-bootstrap';
import logo from '../assets/logo-removebg-preview.png'
import '../css/login.css'

import { useUserAuth } from '../context/UserAuthContext';
import SuccessPopUp from '../components/SuccessPopUp';

function useQuery() {
  const location = useLocation();
  return new URLSearchParams(location.search)
}

const NewPassword = () => {

  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSucces, setShowSuccess] = useState(false)
  const { changepassword } = useUserAuth();
  const query = useQuery();

  //console.log(query.get('mode'))
  //console.log(query.get('oobCode'))
  //console.log(query.get('continueUrl'))


  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("");

    try {
      if (password === '' || confirmPassword === '') {
        setError('Password field(s) is/are empty')
      } else if (password !== confirmPassword) {
        setError('Passwords are not the same')
      } else {
        await changepassword(query.get('oobCode'), password)
          .then(res => {
            console.log(res)
            sessionStorage.removeItem('resetEmail')
            setShowSuccess(true);
          })
      }
    } catch (err) {
      if (err.code === 'auth/invalid-email') {
        setError('Invalid email address')
      } else if (err.code === 'auth/invalid-action-code') {
        setError('Invalid action code')
      } else if (err.code === 'auth/operation-not-allowed') {
        setError('Operation not allowed')
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.')
      } else if (err.code === 'auth/internal-error') {
        setError('Password field is empty')
      } else if (err.code === "auth/missing-email") {
        setError('Missing email address')
      } else if (err.code === "auth/expired-action-code") {
        setError('password reset code has expired.')
      } else if (err.code === "auth/missing-email") {
        setError('Missing email address')
      } else if (err.code === "auth/missing-email") {
        setError('Missing email address')
      } else if (err.code === 'auth/user-disabled') {
        setError('User disabled')
      } else if (err.code === 'auth/user-not-found') {
        setError('User not found')
      } else {
        setError(err.code)
      }
    }
  }


  return (
    <div className='intro-page'>
      <div className='intro-page-div'>
        <div className='logo-intro'>
          <div className='d-flex align-items-center justify-content-center mx-auto'>
            <img src={logo} alt="" className='m-auto'></img>
          </div>
        </div>
        <div className='login-intro'>
          <h1 className='mx-auto text-center mb-5'>Student Login</h1>

          <div className='login-intro-div d-flex justify-content-center mx-auto'>
            <form className='pb-4' onSubmit={(e) => { handleSubmit(e) }} id='signup-form'>
              <div className='d-flex flex-column'>
                <label htmlFor='confirmPassword'>Enter New Password: </label>
                <input id='confirmPassword' name='confirmPassword' type='password' placeholder='Password' onChange={(e) => { setConfirmPassword(e.target.value) }}></input>
              </div>
              <div className='d-flex flex-column'>
                <label htmlFor='studentId'>Confirm Password: </label>
                <input id='studentId' name='studentId' type='password' placeholder='Confirm password' onChange={(e) => { setPassword(e.target.value) }}></input>
              </div>
              <button>Change</button>
            </form>
          </div>

          <div className='copyright'>
            <a href='https://steadfast-private-school.netlify.app/' target='_blank' rel="noreferrer" className='mx-auto text-center w-100'>© Steadfast Private Schools</a>
          </div>
        </div>
        <div className='error-div'>
          {error && <Alert variant='danger' className='error'><BsFillExclamationCircleFill className='text-danger me-4 fs-4' />{error}</Alert>}
        </div>

        {showSucces &&
          (
            <SuccessPopUp message={'Password Updated'} link={'/'} />
          )
        }
      </div>
    </div>
  )
}

export default NewPassword