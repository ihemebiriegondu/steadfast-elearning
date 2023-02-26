import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { BsFillExclamationCircleFill } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import { GrFacebookOption } from 'react-icons/gr'
import { BsApple } from 'react-icons/bs'
import { Alert } from 'react-bootstrap';
import logo from '../assets/logo-removebg-preview.png'
import '../css/login.css'

import { useUserAuth } from '../context/UserAuthContext';
import SuccessPopUp from '../components/SuccessPopUp';

const SignUp = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showSucces, setShowSuccess] = useState(false)
    const { signUp, googleSignIn, facebookSignUp } = useUserAuth();
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("");

        try {
            if (username === '') {
                setError("Invalid Username")
            } else {
                await signUp(email, username, password);
                setShowSuccess(true);
                //navigate("/");
            }
        } catch (err) {
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
        <div className='intro-page'>
            <div className='intro-page-div'>
                <div className='logo-intro'>
                    <div className='d-flex align-items-center justify-content-center mx-auto'>
                        <img src={logo} alt="" className='m-auto'></img>
                    </div>
                </div>
                <div className='login-intro'>
                    <h1 className='mx-auto text-center mb-5'>Create an Account</h1>
                    <div className='login-intro-div d-flex justify-content-center mx-auto'>
                        <form className='pb-4' onSubmit={(e) => { handleSubmit(e) }} id='signup-form'>
                            <div className='d-flex flex-column'>
                                <label htmlFor='username'>Username: </label>
                                <input id='username' name='username' type='text' placeholder='Username' onChange={(e) => { setUsername(e.target.value) }}></input>
                            </div>
                            <div className='d-flex flex-column'>
                                <label htmlFor='email'>Email Address: </label>
                                <input id='email' name='email' type='email' placeholder='example@gmail.com' onChange={(e) => { setEmail(e.target.value) }}></input>
                            </div>
                            <div className='d-flex flex-column'>
                                <label htmlFor='studentId'>Password: </label>
                                <input id='studentId' name='studentId' type='text' placeholder='*******' onChange={(e) => { setPassword(e.target.value) }}></input>
                            </div>
                            <button>Create Account</button>
                        </form>
                    </div>

                    <div className='otherLoginOpt'>
                        <div>
                            <p className='forget'>OR</p>
                        </div>
                        <div className='d-flex justify-content-center align-items-center loginOpts'>
                            <div className='loginOptDiv mx-1 px-3 py-1 shadow' onClick={() => { handleAppleSignIn() }}><BsApple className='loginOpt mb-1' /></div>
                            <div className='loginOptDiv mx-1 px-3 py-1 shadow' onClick={() => { handleFbSignIn() }}><GrFacebookOption className='loginOpt mb-1 opt2' /></div>
                            <div className='loginOptDiv mx-1 px-3 py-1 shadow' onClick={() => { handleGoogleSignIn() }}><FcGoogle className='loginOpt mb-1' /></div>
                        </div>
                        <div className='create d-flex justify-content-center align-items-baseline'>
                            <p className='mb-0 me-2'>Already have an account?</p>
                            <span><Link className='link' to={'/'}>Login</Link></span>
                        </div>
                    </div>

                    <div className='copyright'>
                        <a href='https://steadfast-private-school.netlify.app/' target='_blank' rel="noreferrer" className='mx-auto text-center w-100'>© Steadfast Private Schools</a>
                    </div>
                </div>
                <div className='error-div'>
                    {error && <Alert variant='danger' className='error'><BsFillExclamationCircleFill className='text-danger me-4 fs-4' />{error}</Alert>}
                </div>
                { showSucces &&
                    (
                        <SuccessPopUp message={'Your account has been created'} link={'/'} />
                    )
                }
            </div>
        </div>
    )
}

export default SignUp