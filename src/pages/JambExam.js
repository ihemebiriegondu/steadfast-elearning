import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { Modal } from 'react-bootstrap';
import { BsCalculator, BsAlarm } from 'react-icons/bs'
import { CgLogOut } from 'react-icons/cg'

import '../css/Jamb.css'
import AllQuestions from '../components/AllQuestions';
import Calculator from '../components/Calculator';

const JambExam = () => {

  const Ref = useRef(null);
  const [timer, setTimer] = useState('00:00:00')

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

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total, hours, minutes, seconds
    };
  }


  const startTimer = useCallback((e) => {
    let { total, hours, minutes, seconds }
      = getTimeRemaining(e);
    if (total >= 0) {

      setTimer(
        (hours > 9 ? hours : '0' + hours) + ':' +
        (minutes > 9 ? minutes : '0' + minutes) + ':'
        + (seconds > 9 ? seconds : '0' + seconds)
      )
    }
  }, [])


  const clearTimer = useCallback((e) => {

    setTimer('01:00:00');

    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000)
    Ref.current = id;
  }, [startTimer])


  const getDeadTime = () => {
    let deadline = new Date();

    deadline.setSeconds(deadline.getSeconds() + 3600);
    return deadline;
  }

  useEffect(() => {
    clearTimer(getDeadTime());
  }, [clearTimer]);


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
          <div className='d-flex align-items-center'>
            <BsAlarm className='me-3 timer-icon mb-1' />
            <p className='timer'>{timer}</p>
          </div>
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