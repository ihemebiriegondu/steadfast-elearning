import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { IoArrowBackSharp, IoArrowForwardSharp } from 'react-icons/io5'
import "../css/selectSubject.css"

const SelectStudySubject = () => {

    const [subjectTitle, setsubjectTitle] = useState('')
    const [subjectApiName, setsubjectApiName] = useState('')

    const navigate = useNavigate()

    const handleFormSubmit = (event) => {
        event.preventDefault();
        //console.log(subjectTitle)
        //console.log(subjectApiName)
        if (subjectTitle !== '') {
            localStorage.setItem("subjectTitle", subjectTitle)
            localStorage.setItem("subjectApiName", subjectApiName)
            navigate('/instructions');
        }
    }

    return (
        <div className='selectSubjectDiv'>
            <div className='selectSubjectsubDiv'>
                <h5>Study past questions</h5>
                <div className=''>
                    <form onSubmit={(event) => handleFormSubmit(event)}>
                        <p>Select any subject: </p>
                        <div>
                            <label htmlFor='English'> <input type='radio' className="subject" onClick={(event) => { setsubjectApiName(event.target.value); setsubjectTitle(event.target.id) }} id='English' value="english" name='subjects' /> Use of English</label>
                        </div>
                        <div>
                            <label htmlFor='Mathematics'> <input type='radio' className="subject" onClick={(event) => { setsubjectApiName(event.target.value); setsubjectTitle(event.target.id) }} id='Mathematics' value="mathematics" name='subjects' /> Mathematics</label>
                        </div>
                        <div>
                            <label htmlFor='Physics'> <input type='radio' className="subject" onClick={(event) => { setsubjectApiName(event.target.value); setsubjectTitle(event.target.id) }} id='Physics' value="physics" name='subjects' /> Physics</label>
                        </div>
                        <div>
                            <label htmlFor='Chemistry'> <input type='radio' className="subject" onClick={(event) => { setsubjectApiName(event.target.value); setsubjectTitle(event.target.id) }} id='Chemistry' value="chemistry" name='subjects' /> Chemistry</label>
                        </div>
                        <div>
                            <label htmlFor='Biology'> <input type='radio' className="subject" onClick={(event) => { setsubjectApiName(event.target.value); setsubjectTitle(event.target.id) }} id='Biology' value="biology" name='subjects' /> Biology</label>
                        </div>
                        <div>
                            <label htmlFor='Geography'> <input type='radio' className="subject" onClick={(event) => { setsubjectApiName(event.target.value); setsubjectTitle(event.target.id) }} id='Geography' value="geography" name='subjects' /> Geography</label>
                        </div>
                        <div>
                            <label htmlFor='Government'> <input type='radio' className="subject" onClick={(event) => { setsubjectApiName(event.target.value); setsubjectTitle(event.target.id) }} id='Government' value="government" name='subjects' /> Government</label>
                        </div>
                        <div>
                            <label htmlFor='Economics'> <input type='radio' className="subject" onClick={(event) => { setsubjectApiName(event.target.value); setsubjectTitle(event.target.id) }} id='Economics' value="economics" name='subjects' /> Economics</label>
                        </div>
                        <div>
                            <label htmlFor='History'> <input type='radio' className="subject" onClick={(event) => { setsubjectApiName(event.target.value); setsubjectTitle(event.target.id) }} id='History' value="history" name='subjects' /> History</label>
                        </div>
                        <div>
                            <label htmlFor='Lit-in-English'> <input type='radio' className="subject" onClick={(event) => { setsubjectApiName(event.target.value); setsubjectTitle(event.target.id) }} id='Lit-in-English' value="englishlit" name='subjects' /> Literature in English</label>
                        </div>
                        <div>
                            <label htmlFor='CRK'> <input type='radio' className="subject" onClick={(event) => { setsubjectApiName(event.target.value); setsubjectTitle(event.target.id) }} id='CRK' value="crk" name='subjects' /> CRK</label>
                        </div>
                        <div>
                            <label htmlFor='IRK'> <input type='radio' className="subject" onClick={(event) => { setsubjectApiName(event.target.value); setsubjectTitle(event.target.id) }} id='IRK' value="irk" name='subjects' /> IRK</label>
                        </div>
                        <div>
                            <label htmlFor='Commerce'> <input type='radio' className="subject" onClick={(event) => { setsubjectApiName(event.target.value); setsubjectTitle(event.target.id) }} id='Commerce' value="commerce" name='subjects' /> Commerce</label>
                        </div>
                        <div>
                            <label htmlFor='Accounting'> <input type='radio' className="subject" onClick={(event) => { setsubjectApiName(event.target.value); setsubjectTitle(event.target.id) }} id='Accounting' value="accounting" name='subjects' /> Accounting</label>
                        </div>
                        <div>
                            <label htmlFor='Civic-Education'> <input type='radio' className="subject" onClick={(event) => { setsubjectApiName(event.target.value); setsubjectTitle(event.target.id) }} id='Civic-Education' value="civiledu" name='subjects' /> Civic Education</label>
                        </div>
                        <div>
                            <label htmlFor='Insurance'> <input type='radio' className="subject" onClick={(event) => { setsubjectApiName(event.target.value); setsubjectTitle(event.target.id) }} id='Insurance' value="insurance" name='subjects' /> Insurance</label>
                        </div>

                        <div className='btn-div d-flex justify-content-between'>
                            <Link className='text-decoration-none' to='/dashboard'><button><IoArrowBackSharp className='mb-1' /> Back</button></Link>
                            <button type='submit'>Next <IoArrowForwardSharp className='mb-1' /></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SelectStudySubject