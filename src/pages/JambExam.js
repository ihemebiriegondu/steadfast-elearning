import React, { useState } from 'react'
//import { useNavigate } from "react-router-dom";
//import { useUserAuth } from "../context/UserAuthContext";

import { BsCalculator, BsAlarm } from 'react-icons/bs'
import { CgLogOut } from 'react-icons/cg'

import '../css/Jamb.css'
import AllQuestions from '../components/AllQuestions';

const JambExam = () => {

  //const { logOut, user } = useUserAuth();
  //const navigate = useNavigate();

  /*const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };*/


  return (
    <div className='questions-page'>
      <div className='questions-subdiv'>
        <div className='d-flex justify-content-between align-items-center question-header py-2 px-3'>
          <p className='mb-0 ms-2' /*</div>${onClick={() => { handleLogout() }}*/><CgLogOut className='me-2' />Logout</p>
          <p className='mb-0 me-2'><BsCalculator className='me-2' />Calculator</p>
        </div>
        <div className='info-div d-flex justify-content-between align-items-center py-2'>
          <div className=''>
            {/*<img id='user-img' src={user.photoURL} alt='' />*/}
          </div>
          <div className='d-flex align-items-center'>
            <BsAlarm className='me-3 timer-icon' />
            <p className='timer'>00:40:00</p>
          </div>
        </div>
        <div>
          <AllQuestions />
        </div >
      </div>
    </div>
  )
}
export default JambExam