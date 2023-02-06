import React from 'react'
import { useLocation, Link } from 'react-router-dom';
import '../css/previewanswers.css'

const PreviewPractiveAnswers = () => {

    const location = useLocation()
    let allQuestions = location.state.questions

    allQuestions.forEach(q => {
        q.correctAnswer = q.options.find(x => x.isAnswer === true).id;
        //console.log(correctAnswers)
    })

    return (
        <div className='preview-answer'>
            <h5 className='text-center mb-4'>{localStorage.getItem('subjectTitle')}</h5>
            {allQuestions.map((q, index) =>
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

            <div className='submitbtn-div'>
                <button className=''><Link to="/dashboard" className='text-decoration-none w-100 h-100 d-inline-block py-md-3 py-2 px-sm-5 px-3 text-white'>Back home</Link></button>
            </div>
        </div>
    )
}

export default PreviewPractiveAnswers