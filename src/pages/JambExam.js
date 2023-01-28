import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { Modal } from 'react-bootstrap';
import { BsCalculator } from 'react-icons/bs'
import { CgLogOut } from 'react-icons/cg'

import '../css/Jamb.css'
import AllQuestions from '../components/AllQuestions';
import Calculator from '../components/Calculator';
import Timer from '../components/Timer';

const JambExam = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <div className='questions-page'>
      <div className='questions-subdiv'>
        <div className='d-flex justify-content-between align-items-center question-header py-2 px-3'>
          <p className='mb-0 ms-2' onClick={() => handleLogout()}><CgLogOut className='me-2' />Logout</p>
          <p className='mb-0 me-2' onClick={handleShow}><BsCalculator className='me-2' />Calculator</p>
        </div>
        <div className='info-div d-flex justify-content-between align-items-center py-2'>
          <div className='' id='user-img'>
            <img src={user.photoURL} alt='' />
          </div>
          <Timer />
        </div>
        <div>
          <AllQuestions />
        </div >
      </div>


      <Modal show={show} onHide={handleClose} className='calc'>
        <div className='calculator-body mx-auto'>
          <div className='calculator-subdiv px-3 py-4'>
            <Modal.Header closeButton className='pt-0 px-0'>
              <Modal.Title className='pt-0'><h6 className=''>Calculator</h6></Modal.Title>
            </Modal.Header>
            <Calculator />
          </div>
        </div >
      </Modal>

    </div>
  )
}
export default JambExam