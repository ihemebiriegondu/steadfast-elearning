import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';
import '../css/previewanswers.css'

function PreviewAnswer() {

  const [key, setKey] = useState('firstPaper');
  const location = useLocation()

  //console.log(location)
  //console.log(location.state.questions)
  let allQuestions = location.state.questions
  let questionOne = allQuestions[0]
  let questionTwo = allQuestions[1]
  let questionThree = allQuestions[2]
  let questionFour = allQuestions[3]

  questionOne.forEach(q => {
    q.correctAnswer = q.options.find(x => x.isAnswer === true).id;
    //console.log(correctAnswers)
  })

  questionTwo.forEach(q => {
    q.correctAnswer = q.options.find(x => x.isAnswer === true).id;
    //console.log(correctAnswers)
  })

  questionThree.forEach(q => {
    q.correctAnswer = q.options.find(x => x.isAnswer === true).id;
    //console.log(correctAnswers)
  })

  questionFour.forEach(q => {
    q.correctAnswer = q.options.find(x => x.isAnswer === true).id;
    //console.log(correctAnswers)
  })

  const subjectNames = JSON.parse(localStorage.getItem("subjectNames"));

  return (
    <div className='preview-answer'>
      <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
        <Tab eventKey="firstPaper" title="English">
          {questionOne.map((q, index) =>
            <div key={q.id} className={`mb-2 previewQuestionsBorder ${q.isCorrect ? 'answerCorrectBorder' : 'answerWrongBorder'}`}>
              <div className="result-question px-md-5 px-3 py-3">
                <h6 className='mb-4'>{index + 1}. <span dangerouslySetInnerHTML={{ __html: q.name }} /></h6>
                <div className="row row-cols-2 options">
                  {
                    q.options.map(option =>
                      <div key={option.id} className={`col-6 mb-1 option  ${option.isAnswer ? 'isAnswer' : 'notAnswer'}  ${!option.isAnswer && option.selected ? 'notCorrect' : 'bg-none'}`}>
                        <span className='alphabetOption me-3'>{option.id}</span>
                        <label htmlFor={option.id}><input id={option.id} className={`form-check-input`} type="checkbox" disabled="disabled" checked={option.selected || option.isAnswer} /> {option.name}</label>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          )}
        </Tab>

        <Tab eventKey="secondPaper" title={subjectNames[1]}>
          {questionTwo.map((q, index) =>
            <div key={q.id} className={`mb-2 previewQuestionsBorder ${q.isCorrect ? 'answerCorrectBorder' : 'answerWrongBorder'}`}>
              <div className="result-question px-md-5 px-3 py-3">
                <h6 className='mb-4'>{index + 1}. {q.name}</h6>
                <div className="row row-cols-2 options">
                  {
                    q.options.map(option =>
                      <div key={option.id} className={`col-6 mb-1 option  ${option.isAnswer ? 'isAnswer' : 'notAnswer'}  ${!option.isAnswer && option.selected ? 'notCorrect' : 'bg-none'}`}>
                        <span className='alphabetOption me-3'>{option.id}</span>
                        <label htmlFor={option.id}><input id={option.id} className={`form-check-input`} type="checkbox" disabled="disabled" checked={option.selected || option.isAnswer} /> {option.name}</label>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          )}
        </Tab>

        <Tab eventKey="thirdPaper" title={subjectNames[2]}>
          {questionThree.map((q, index) =>
            <div key={q.id} className={`mb-2 previewQuestionsBorder ${q.isCorrect ? 'answerCorrectBorder' : 'answerWrongBorder'}`}>
              <div className="result-question px-md-5 px-3 py-3">
                <h6 className='mb-4'>{index + 1}. {q.name}</h6>
                <div className="row row-cols-2 options">
                  {
                    q.options.map(option =>
                      <div key={option.id} className={`col-6 mb-1 option  ${option.isAnswer ? 'isAnswer' : 'notAnswer'}  ${!option.isAnswer && option.selected ? 'notCorrect' : 'bg-none'}`}>
                        <span className='alphabetOption me-3'>{option.id}</span>
                        <label htmlFor={option.id}><input id={option.id} className={`form-check-input`} type="checkbox" disabled="disabled" checked={option.selected || option.isAnswer} /> {option.name}</label>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          )}
        </Tab>

        <Tab eventKey="forthPaper" title={subjectNames[3]}>
          {questionFour.map((q, index) =>
            <div key={q.id} className={`mb-2 previewQuestionsBorder ${q.isCorrect ? 'answerCorrectBorder' : 'answerWrongBorder'}`}>
              <div className="result-question px-md-5 px-3 py-3">
                <h6 className='mb-4'>{index + 1}. {q.name}</h6>
                <div className="row row-cols-2 options">
                  {
                    q.options.map(option =>
                      <div key={option.id} className={`col-6 mb-1 option  ${option.isAnswer ? 'isAnswer' : 'notAnswer'}  ${!option.isAnswer && option.selected ? 'notCorrect' : 'bg-none'}`}>
                        <span className='alphabetOption me-3'>{option.id}</span>
                        <label htmlFor={option.id}><input id={option.id} className={`form-check-input`} type="checkbox" disabled="disabled" checked={option.selected || option.isAnswer} /> {option.name}</label>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          )}
        </Tab>
      </Tabs>


      <div className='submitbtn-div'>
        <button className=''><Link to="/dashboard" className='text-decoration-none w-100 h-100 d-inline-block py-md-3 py-2 px-sm-5 px-3 text-white'>Back home</Link></button>
      </div>
    </div>
  )
}

export default PreviewAnswer
