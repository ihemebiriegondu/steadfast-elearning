import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { IoArrowBackSharp, IoArrowForwardSharp } from 'react-icons/io5'
import "../css/selectSubject.css"


const SelectSubjects = () => {

    const navigate = useNavigate()

    function addLimit() {
        let checkboxgroup = document.querySelectorAll(".subject");
        let checkedBoxes = (document.querySelectorAll(".subject:checked")).length
        //console.log(checkedBoxes)

        let boolValue = checkedBoxes >= 4

        checkboxgroup.forEach(checkbox => {
            if (checkbox.checked === false) {
                checkbox.disabled = boolValue
            }
        });
    }


    const handleFormSubmit = (event) => {
        event.preventDefault()
        let subjectArray = []
        let subjectNames = []

        let checkboxgroup = document.querySelectorAll(".subject:checked");
        let checkedBoxes = (document.querySelectorAll(".subject:checked")).length

        if (checkedBoxes < 4) {
            console.log("Must select 4 subjects")
        } else {
            //console.log(checkboxgroup)
            checkboxgroup.forEach(checkbox => {
                //console.log(checkbox.value)
                subjectArray.push(checkbox.value)
                subjectNames.push(checkbox.id)
            });
            //console.log(subjectArray)
            localStorage.setItem("subjects", JSON.stringify(subjectArray))
            localStorage.setItem("subjectNames", JSON.stringify(subjectNames))
            navigate('/exam instruction');
        }
    }



    return (
        <div className='selectSubjectDiv'>
            <div className='selectSubjectsubDiv'>
                <h5>Select subjects</h5>
                <div className=''>
                    <form onSubmit={(event) => handleFormSubmit(event)}>
                        <p>Select any 3 subjects to start the exam, (Use of English is compulsory)</p>
                        <div>
                            <label htmlFor='English'> <input type='checkbox' className="subject" id='English' value="english" name='subjects' checked disabled /> Use of English</label>
                        </div>
                        <div>
                            <label htmlFor='Mathematics'> <input type='checkbox' className="subject" onClick={() => { addLimit() }} id='Mathematics' value="mathematics" name='subjects' /> Mathematics</label>
                        </div>
                        <div>
                            <label htmlFor='Physics'> <input type='checkbox' className="subject" onClick={() => { addLimit() }} id='Physics' value="physics" name='subjects' /> Physics</label>
                        </div>
                        <div>
                            <label htmlFor='Chemistry'> <input type='checkbox' className="subject" onClick={() => { addLimit() }} id='Chemistry' value="chemistry" name='subjects' /> Chemistry</label>
                        </div>
                        <div>
                            <label htmlFor='Biology'> <input type='checkbox' className="subject" onClick={() => { addLimit() }} id='Biology' value="biology" name='subjects' /> Biology</label>
                        </div>
                        <div>
                            <label htmlFor='Geography'> <input type='checkbox' className="subject" onClick={() => { addLimit() }} id='Geography' value="geography" name='subjects' /> Geography</label>
                        </div>
                        <div>
                            <label htmlFor='Government'> <input type='checkbox' className="subject" onClick={() => { addLimit() }} id='Government' value="government" name='subjects' /> Government</label>
                        </div>
                        <div>
                            <label htmlFor='Economics'> <input type='checkbox' className="subject" onClick={() => { addLimit() }} id='Economics' value="economics" name='subjects' /> Economics</label>
                        </div>
                        <div>
                            <label htmlFor='History'> <input type='checkbox' className="subject" onClick={() => { addLimit() }} id='History' value="history" name='subjects' /> History</label>
                        </div>
                        <div>
                            <label htmlFor='Lit-in-English'> <input type='checkbox' className="subject" onClick={() => { addLimit() }} id='Lit-in-English' value="englishlit" name='subjects' /> Literature in English</label>
                        </div>
                        <div>
                            <label htmlFor='CRK'> <input type='checkbox' className="subject" onClick={() => { addLimit() }} id='CRK' value="crk" name='subjects' /> CRK</label>
                        </div>
                        <div>
                            <label htmlFor='IRK'> <input type='checkbox' className="subject" onClick={() => { addLimit() }} id='IRK' value="irk" name='subjects' /> IRK</label>
                        </div>
                        <div>
                            <label htmlFor='Commerce'> <input type='checkbox' className="subject" onClick={() => { addLimit() }} id='Commerce' value="commerce" name='subjects' /> Commerce</label>
                        </div>
                        <div>
                            <label htmlFor='Accounting'> <input type='checkbox' className="subject" onClick={() => { addLimit() }} id='Accounting' value="accounting" name='subjects' /> Accounting</label>
                        </div>
                        <div>
                            <label htmlFor='Civic-Education'> <input type='checkbox' className="subject" onClick={() => { addLimit() }} id='Civic-Education' value="civiledu" name='subjects' /> Civic Education</label>
                        </div>
                        <div>
                            <label htmlFor='Insurance'> <input type='checkbox' className="subject" onClick={() => { addLimit() }} id='Insurance' value="insurance" name='subjects' /> Insurance</label>
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

export default SelectSubjects