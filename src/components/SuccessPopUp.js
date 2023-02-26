import React from 'react'
import { Link } from 'react-router-dom'
import {BsCheck2Circle} from 'react-icons/bs'
import '../css/successpopup.css'


const SuccessPopUp = ({message, link}) => {
  return (
    <div className='successpopup d-flex flex-column align-items-center mx-auto shadow'>
        <h1>Success!</h1>
        <p>{message}</p>
        <BsCheck2Circle className='successIcon' />
        <Link className='link text-decoration-none' to={link}><button className='shadow'>continue</button></Link>
    </div>
  )
}

export default SuccessPopUp