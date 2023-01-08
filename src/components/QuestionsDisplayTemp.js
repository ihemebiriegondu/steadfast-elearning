import React, { Component } from 'react'
import '../css/QuesTemp.css'


export default class QuestionsDisplayTemp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      size: 1,
      //time: {},
      //seconds: 1800
    };
    //this.timer = 0;
    //this.startTimer = this.startTimer.bind(this);
    //this.countDown = this.countDown.bind(this);
  }

  //To keep selected options after pressing the next or previous button
  onAnswer(question, option) {

    let quiz = this.props.datas;
    //console.log(quiz)

    let quiz1 = quiz[0]
    //console.log(quiz1)

    let q = quiz1.find(x => x.id === question.id);
    //console.log(q)

    /*if (q.questionTypeId === 1) {
      q.options.forEach((x) => { x.selected = false; });
    }*/
    q.options.forEach((x) => { x.selected = false; });

    q.options.find(x => x.id === option.id).selected = true;

  }

  //checking if an option is selected for the review
  isAnswered = (q) => {
    return q.options.some(x => x.selected) ? 'Answered' : 'Not Answered';
  }


  render() {

    let allQuestions = this.props.datas
    //console.log(allQuestions)
    let questionOne = allQuestions[0]
    //console.log(questionOne)

    //For showing the questions one after the other instead of together on a page
    let questions1 = (questionOne) ? questionOne.slice(this.state.index, this.state.index + this.state.size) : [];
    //console.log(questions1)

    return (
      <div className='quesTemp px-3'>
        <div>
          <div className='ps-4'>
            {
              questions1.map(q =>
                <div key={q.id}>
                  <h4 className='question-instruction'>{q.section}</h4>
                  <img src={q.image} alt='' />
                  <p className='question'><span>{this.state.index + 1}. </span>{q.name}</p>
                  <div className='option-div ms-5'>
                    {
                      q.options.slice(0, -1).map(option =>
                        <div className='options' key={option.id}>
                          <span className='alphabetOption'>{option.id}</span>
                          <input id={option.id} checked={option.selected} name={q.name} type="radio" onChange={() => this.onAnswer(q, option)} />
                          <label htmlFor={option.id} className='ms-3'>
                            {option.name}
                          </label>
                        </div>
                      )
                    }
                  </div>
                </div>
              )
            }
          </div>

          <div className='btns-div'>
            <button className='actionbtn py-3 px-5 me-5' onClick={() => { if (this.state.index > 0) { this.setState({ index: this.state.index - 1 }) } }}>Previous</button>
            <button className='actionbtn py-3 px-5 me-5' onClick={() => { if (this.state.index < (questionOne.length - 1)) { this.setState({ index: this.state.index + 1 }) } }}>Next</button>
          </div>

          <div className='reviewbtns-div row g-2'>
            {questionOne.map((q, index) =>
              <div key={q.id} className="cursor-pointer col">
                <div id={index} onClick={(e) => { (this.setState({ index: parseInt(e.target.id, q.length) })); }} className={`reviewbtn px-3 text-center py-2 rounded`}>{index + 1}{/*. {this.isAnswered(q)}*/}</div>
              </div>
            )}
          </div>

          <hr className='mt-4 w-75 m-auto' />

          <div className='submitbtn-div'>
            <button className='py-3 px-5'>Submit Exam</button>
          </div>
        </div>
      </div>
    )
  }
}
