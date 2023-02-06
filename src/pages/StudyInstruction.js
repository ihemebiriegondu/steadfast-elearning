import React from 'react'
import { TiArrowLeftThick, TiArrowRightThick } from 'react-icons/ti'
import { Link } from 'react-router-dom';
import '../css/instruction.css'
import { IoArrowBackSharp, IoArrowForwardSharp } from 'react-icons/io5'

const StudyInstruction = () => {
    return (
        <div className='instructions'>
            <div className='insruction-subdiv'>
                <div className='instuction-title'>
                    <h3 className='text-center'>Examination Instructions</h3>
                </div>
                
                <div className='time-left mb-5'>
                    <p className='mb-0 pb-0 fw-bold'>Selected subject: <span className='fw-normal h5'>{localStorage.getItem('subjectTitle')}</span></p>
                    <p className='mb-0 pb-0 fw-bold'>Total questions: <span className='fw-normal'>30 questions</span></p>
                    <p className='mb-0 pb-0 fw-bold'>Total time: <span className='fw-normal'>20 minutes</span></p>
                </div>
                <div className='all-instructions mb-5'>
                    <h5>Read all instructions carefully before clicking the start button.</h5>

                    <div className='cbt-instructions ms-2'>
                        <p className='mb-0 pb-1'>Carefully read each questions before choosing the correct answer.</p>
                        <p className='mb-0 pb-1'>Use the <span className='fw-bold'><TiArrowLeftThick className='mb-1' /></span> and <span className='fw-bold'><TiArrowRightThick className='mb-1' /></span> buttons to navigate between questions.</p>
                        <p className='mb-0 pb-1'>Use the <span className='fw-bold'>Review</span> button to check for unanswered questions.</p>
                        <p className='mb-0 pb-1'>Click the question numbers in the Review page to jump to a certain question.</p>
                        <p className='mb-0 pb-1'>Click the <span className='fw-bold'>"Submit"</span> button when you are <span className='fw-bold'>done</span> with the exam.</p>
                        <p className='mb-0 pb-1'><span className='fw-bold'>Note: </span>Do not refresh the page after the exam has started</p>
                    </div>
                </div>
                <div className='btn-div2'>
                    <Link className='text-decoration-none' to='/practice questions'><button className='text-uppercase'><IoArrowForwardSharp className='mb-1 me-2' /> Start Exam</button></Link>
                </div>
                <div className='btn-div d-flex justify-content-between'>
                    <Link className='text-decoration-none' to='/select subject'><button><IoArrowBackSharp className='mb-1' /> Back</button></Link>
                </div>
            </div>
        </div>
    )
}

export default StudyInstruction