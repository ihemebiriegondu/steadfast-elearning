import React from 'react'

const SelectSubjects = () => {

    let limit = 4
    let count = 0
    let checkboxgroup = document.querySelectorAll(".subject");


    function addLimit(event) {
        console.log(limit)
        console.log(event.target)

        count += 1
        console.log(count)
    }

    /*for (let i = 0; i < checkboxgroup.length; i++)
        checkboxgroup[i].onclick = selectiveCheck;
    function selectiveCheck(event) {
        console.log("dfshj")

        let checkedChecks = document.querySelectorAll(".subject:checked");
        if (checkedChecks.length >= limit + 1)
            return false;
    }*/



    return (
        <div>
            <h5>Select subjects</h5>
            <div>
                <form>
                    <div>
                        <label htmlFor='English'> <input type='checkbox' className="subject" id='English' value="English" name='subjects' checked disabled /> Use of English</label>
                    </div>
                    <div>
                        <label onClick={(event) => {addLimit(event)}} htmlFor='Mathematics'> <input type='checkbox' className="subject" id='Mathematics' value="Mathematics" name='subjects' /> Mathematics</label>
                    </div>
                    <div>
                        <label onClick={(event) => {addLimit(event)}} htmlFor='Physics'> <input type='checkbox' className="subject" id='Physics' value="Physics" name='subjects' /> Physics</label>
                    </div>
                    <div>
                        <label onClick={(event) => {addLimit(event)}} htmlFor='Chemistry'> <input type='checkbox' className="subject" id='Chemistry' value="Chemistry" name='subjects' /> Chemistry</label>
                    </div>
                    <div>
                        <label onClick={(event) => {addLimit(event)}} htmlFor='Biology'> <input type='checkbox' className="subject" id='Biology' value="Biology" name='subjects' /> Biology</label>
                    </div>
                    <div>
                        <label onClick={(event) => {addLimit(event)}} htmlFor='Geography'> <input type='checkbox' className="subject" id='Geography' value="Geography" name='subjects' /> Geography</label>
                    </div>
                    <div>
                        <label onClick={(event) => {addLimit(event)}} htmlFor='Government'> <input type='checkbox' className="subject" id='Government' value="Government" name='subjects' /> Government</label>
                    </div>
                    <div>
                        <label onClick={(event) => {addLimit(event)}} htmlFor='Economics'> <input type='checkbox' className="subject" id='Economics' value="Economics" name='subjects' /> Economics</label>
                    </div>
                    <div>
                        <label onClick={(event) => {addLimit(event)}} htmlFor='History'> <input type='checkbox' className="subject" id='History' value="History" name='subjects' /> History</label>
                    </div>
                    <div>
                        <label onClick={(event) => {addLimit(event)}} htmlFor='Literature in English'> <input type='checkbox' className="subject" id='Literature in English' value="Literature in English" name='subjects' /> Literature in English</label>
                    </div>
                    <div>
                        <label onClick={(event) => {addLimit(event)}} htmlFor='French'> <input type='checkbox' className="subject" id='French' value="French" name='subjects' /> French</label>
                    </div>
                    <div>
                        <label onClick={(event) => {addLimit(event)}} htmlFor='CRK'> <input type='checkbox' className="subject" id='CRK' value="CRK" name='subjects' /> CRK</label>
                    </div>
                    <div>
                        <label onClick={(event) => {addLimit(event)}} htmlFor='IRK'> <input type='checkbox' className="subject" id='IRK' value="IRK" name='subjects' /> IRK</label>
                    </div>
                    <div>
                        <label onClick={(event) => {addLimit(event)}} htmlFor='Agricultural Science'> <input type='checkbox' className="subject" id='Agricultural Science' value="Agricultural Science" name='subjects' /> Agricultural Science</label>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SelectSubjects