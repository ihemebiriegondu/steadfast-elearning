import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { BsFillExclamationCircleFill } from 'react-icons/bs'
import { Alert } from 'react-bootstrap';
import logo from '../assets/logo-removebg-preview.png'
import '../css/login.css'

import { useUserAuth } from '../context/UserAuthContext';

const Login = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { logIn } = useUserAuth();
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("");

        if (username === "") {
            setError("Invalid Username")
        } else {
            try {
                await logIn(email, password);
                navigate("/dashboard");
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
    }


    return (
        <div className='intro-page'>
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
                            <label htmlFor='username'>Username: </label>
                            <input id='username' name='username' type='text' placeholder='username' onChange={(e) => { setUsername(e.target.value) }}></input>
                        </div>
                        <div className='d-flex flex-column'>
                            <label htmlFor='email'>Email Address: </label>
                            <input id='email' name='email' type='email' placeholder='example@gmail.com' onChange={(e) => { setEmail(e.target.value) }}></input>
                        </div>
                        <div className='d-flex flex-column'>
                            <label htmlFor='studentId'>Student ID: </label>
                            <input id='studentId' name='studentId' type='text' placeholder='SPS***' onChange={(e) => { setPassword(e.target.value) }}></input>
                        </div>
                        <button>Log in</button>
                    </form>
                </div>
            </div>
            <div className='error-div'>
                {error && <Alert variant='danger' className='error'><BsFillExclamationCircleFill className='text-danger me-4 fs-4' />{error}</Alert>}
            </div>
        </div>
    )
}

export default Login