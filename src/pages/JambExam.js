import React from 'react'

import '../css/Jamb.css'
import AllQuestions from '../components/AllQuestions';

const JambExam = () => {

  //console.log(isSubmitted)


  return (
    <div className='questions-page'>
      <div className='questions-subdiv'>
        <div>
          <AllQuestions />
        </div >
      </div>
    </div>
  )
}
export default JambExam