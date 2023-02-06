import React, { useState } from 'react'
import { useUserAuth } from "../context/UserAuthContext";
import { Modal } from 'react-bootstrap';
import { BsCalculator } from 'react-icons/bs'

import '../css/Jamb.css'
import AllQuestions from '../components/AllQuestions';
import Calculator from '../components/Calculator';

const JambExam = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { user } = useUserAuth();

  //console.log(isSubmitted)


  return (
    <div className='questions-page'>
      <div className='questions-subdiv'>
        <div className='d-flex justify-content-between align-items-center question-header py-2 px-3'>
          <div className='' id='user-img'>
            <img src={user.photoURL} alt='' />
          </div>
          <p className='mb-0 me-2' onClick={handleShow}><BsCalculator className='me-2' />Calculator</p>
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