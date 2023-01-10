import React from 'react'
import { useNavigate } from 'react-router-dom';


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
            navigate('/jamb exam');
        }
    }



    return (
        <div>
            <h5>Select subjects</h5>
            <div>
                <form onSubmit={(event) => handleFormSubmit(event)}>
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
                        <label htmlFor='Literature in English'> <input type='checkbox' className="subject" onClick={() => { addLimit() }} id='Literature in English' value="literature" name='subjects' /> Literature in English</label>
                    </div>
                    <div>
                        <label htmlFor='French'> <input type='checkbox' className="subject" onClick={() => { addLimit() }} id='French' value="french" name='subjects' /> French</label>
                    </div>
                    <div>
                        <label htmlFor='CRK'> <input type='checkbox' className="subject" onClick={() => { addLimit() }} id='CRK' value="crk" name='subjects' /> CRK</label>
                    </div>
                    <div>
                        <label htmlFor='IRK'> <input type='checkbox' className="subject" onClick={() => { addLimit() }} id='IRK' value="irk" name='subjects' /> IRK</label>
                    </div>
                    <div>
                        <label htmlFor='Agricultural Science'> <input type='checkbox' className="subject" onClick={() => { addLimit() }} id='Agricultural Science' value="agric" name='subjects' /> Agricultural Science</label>
                    </div>
                    <div>
                        <button>Back</button>
                        <button type='submit'>Next</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SelectSubjects