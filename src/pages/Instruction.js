import React from 'react'
import { Link } from 'react-router-dom';
import '../css/instruction.css'
import { IoArrowBackSharp, IoArrowForwardSharp } from 'react-icons/io5'


const Instruction = () => {

    const subjectNames = JSON.parse(localStorage.getItem("subjectNames"));

    return (
        <div className='instructions'>
            <div className='insruction-subdiv'>
                <div className='instuction-title'>
                    <h3 className='text-center'>Examination Instructions</h3>
                </div>
                <div className='selected-subjects'>
                    <h5>Selected Subjects</h5>
                    <ul className='ms-3 mb-4'>
                        <li>{subjectNames[0]}</li>
                        <li>{subjectNames[1]}</li>
                        <li>{subjectNames[2]}</li>
                        <li>{subjectNames[3]}</li>
                    </ul>
                </div>
                <div className='time-left mb-5'>
                    <p className='mb-0 pb-0 fw-bold'>Total questions: <span className='fw-normal'>100 questions</span></p>
                    <p className='mb-0 pb-0 fw-bold'>Total time: <span className='fw-normal'>1 hour</span></p>
                </div>
                <div className='all-instructions mb-5'>
                    <h5>Read all instructions carefully before clicking the start button.</h5>

                    <div className='cbt-instructions ms-2'>
                        <p className='mb-0 pb-1'>You would be given 40 questions in English Language and 20 questions each in the other 3 subjects (which gives a total of 100 questions).</p>
                        <p className='mb-0 pb-1'>Carefully read each questions before choosing the correct answer.</p>
                        <p className='mb-0 pb-1'>Use the <span className='fw-bold'>"Next"</span> and <span className='fw-bold'>"Prev"</span> buttons to navigate between questions.</p>
                        <p className='mb-0 pb-1'>Use the <span className='fw-bold'>Review</span> button to check for unanswered questions.</p>
                        <p className='mb-0 pb-1'>Click the question numbers in the Review page to jump to a certain question.</p>
                        <p className='mb-0 pb-1'>Click the <span className='fw-bold'>"Submit"</span> button when you are <span className='fw-bold'>done</span> with the exam.</p>
                        <p className='mb-0 pb-1'><span className='fw-bold'>Note: </span>Do not refresh the page after the exam has started</p>
                    </div>
                </div>
                <div className='btn-div2'>
                    <Link className='text-decoration-none' to='/jamb exam'><button className='text-uppercase'><IoArrowForwardSharp className='mb-1 me-2' /> Start Exam</button></Link>
                </div>
                <div className='btn-div d-flex justify-content-between'>
                    <Link className='text-decoration-none' to='/select subjects'><button><IoArrowBackSharp className='mb-1' /> Back</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Instruction