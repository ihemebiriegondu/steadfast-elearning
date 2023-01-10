import React from 'react'

const SelectSubjects = () => {

    function addLimit(event) {
        let checkboxgroup = document.querySelectorAll(".subject");
        let checkedBoxes = (document.querySelectorAll(".subject:checked")).length
        console.log(checkedBoxes)

        if (checkedBoxes >= 4) {
            console.log("greater")
            //console.log(checkboxgroup)
            checkboxgroup.forEach(checkbox => {
                if (checkbox.checked === false) {
                    checkbox.setAttribute("disabled", true)
                }
            });
        }
    }



    return (
        <div>
            <h5>Select subjects</h5>
            <div>
                <form>
                    <div>
                        <label htmlFor='English'> <input type='checkbox' className="subject" id='English' value="English" name='subjects' checked disabled /> Use of English</label>
                    </div>
                    <div>
                        <label htmlFor='Mathematics'> <input type='checkbox' className="subject" onClick={(event) => { addLimit(event) }} id='Mathematics' value="Mathematics" name='subjects' /> Mathematics</label>
                    </div>
                    <div>
                        <label htmlFor='Physics'> <input type='checkbox' className="subject" onClick={(event) => { addLimit(event) }} id='Physics' value="Physics" name='subjects' /> Physics</label>
                    </div>
                    <div>
                        <label htmlFor='Chemistry'> <input type='checkbox' className="subject" onClick={(event) => { addLimit(event) }} id='Chemistry' value="Chemistry" name='subjects' /> Chemistry</label>
                    </div>
                    <div>
                        <label htmlFor='Biology'> <input type='checkbox' className="subject" onClick={(event) => { addLimit(event) }} id='Biology' value="Biology" name='subjects' /> Biology</label>
                    </div>
                    <div>
                        <label htmlFor='Geography'> <input type='checkbox' className="subject" onClick={(event) => { addLimit(event) }} id='Geography' value="Geography" name='subjects' /> Geography</label>
                    </div>
                    <div>
                        <label htmlFor='Government'> <input type='checkbox' className="subject" onClick={(event) => { addLimit(event) }} id='Government' value="Government" name='subjects' /> Government</label>
                    </div>
                    <div>
                        <label htmlFor='Economics'> <input type='checkbox' className="subject" onClick={(event) => { addLimit(event) }} id='Economics' value="Economics" name='subjects' /> Economics</label>
                    </div>
                    <div>
                        <label htmlFor='History'> <input type='checkbox' className="subject" onClick={(event) => { addLimit(event) }} id='History' value="History" name='subjects' /> History</label>
                    </div>
                    <div>
                        <label htmlFor='Literature in English'> <input type='checkbox' className="subject" onClick={(event) => { addLimit(event) }} id='Literature in English' value="Literature in English" name='subjects' /> Literature in English</label>
                    </div>
                    <div>
                        <label htmlFor='French'> <input type='checkbox' className="subject" onClick={(event) => { addLimit(event) }} id='French' value="French" name='subjects' /> French</label>
                    </div>
                    <div>
                        <label htmlFor='CRK'> <input type='checkbox' className="subject" onClick={(event) => { addLimit(event) }} id='CRK' value="CRK" name='subjects' /> CRK</label>
                    </div>
                    <div>
                        <label htmlFor='IRK'> <input type='checkbox' className="subject" onClick={(event) => { addLimit(event) }} id='IRK' value="IRK" name='subjects' /> IRK</label>
                    </div>
                    <div>
                        <label htmlFor='Agricultural Science'> <input type='checkbox' className="subject" onClick={(event) => { addLimit(event) }} id='Agricultural Science' value="Agricultural Science" name='subjects' /> Agricultural Science</label>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SelectSubjects