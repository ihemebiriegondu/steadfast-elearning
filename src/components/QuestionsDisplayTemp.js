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
  onAnswer(question, option, event) {

    let quiz = this.props.datas;
    console.log(quiz)

    quiz.forEach(question => {
      //console.log(question.option)
      let newOptions = []
      let correctOption = question.answer
      console.log(correctOption)

      for (let x in question.option) {
        /*console.log(x)
        console.log(question.option[x])*/

        let newOptionsValue = {}
        newOptionsValue.id = x
        newOptionsValue.name = question.option[x]
        newOptionsValue.isAnswer = x === correctOption? "True" : "False"
        console.log(newOptionsValue)

        newOptions.push(newOptionsValue)
      }
      //console.log(typeof question.option)
      console.log(newOptions)
    });
    //console.log(quiz)
    

    let q = quiz.find(x => x.id === question.id);
    console.log(q.option.selectedValue)

    //console.log(q)
    console.log(q.option)

    /*if (q.examtype === 'utme') {
      q.option.forEach((x) => { console.log(x) });
    }*/

    /*for (const key in q.option) {
      console.log(q.option[key])
      q.option[key].checked = false
    }*/

    //console.log(option)

    q.option.selectedValue = option
    let selectedValueOption = q.option.selectedValue;

    //method for searching theough an object for a key that has a particular value

    /*if (Object.keys(q.option).find(key => q.option[key] === selectedValueOption)) {
      document.getElementById(selectedValueOption).value = true
    }*/
    //console.log(q.option[newOp])

    //console.log(selectedValueOption)

    console.log(event.target)

    /*console.log(document.getElementById(selectedValueOption).value)
    document.getElementById(selectedValueOption).checked = true;*/

    console.log(option === selectedValueOption)


    //console.log(q.option[newOp])
    //document.getElementById(q.option[newOp]).selected = true;
    //console.log(document.getElementById(q.option[newOp]).selected);
    //console.log(q.option[newOp].selected)


    //q.option.a.selected
    //console.log(q.option)
    //console.log(typeof newOp)

    /*newOp.selected = true
    q.option.a.selected = true;
    console.log(q.option.newOp.selected)*/

    //option.selected = true;
    //console.log(option.selected)
    //Object.keys(q.option).find(key => q.option[key] === option).selected = true;
    //this.props.onAnswer(quiz);
  }


  render() {

    let firstQuestions = this.props.datas
    //console.log(firstQuestions)


    //For showing the questions one after the other instead of together on a page
    let questions1 = (firstQuestions) ? firstQuestions.slice(this.state.index, this.state.index + this.state.size) : [];

    return (
      <div className='quesTemp px-3'>
        <div>
          <div className='ps-4'>
            {
              questions1.map(q =>
                <div key={q.id}>
                  <h4 className='question-instruction'>{q.section}</h4>
                  <img src={q.image} alt='' />
                  <p className='question'><span>{this.state.index + 1}. </span>{q.question}</p>
                  <div className='option-div ms-5'>
                    <div className='options'>
                      <input type={'radio'} id={q.option.a} value='' name={q.id} className='me-3' checked={q.option.a === q.option.selectedValue} onChange={(event) => { this.onAnswer(q, q.option.a, event) }} />
                      <label htmlFor={q.option.a}>{q.option.a}</label>
                    </div>
                    <div className='options'>
                      <input type={'radio'} id={q.option.b} value='' name={q.id} className='me-3' checked={q.option.b === q.option.selectedValue} onChange={(event) => { this.onAnswer(q, q.option.b, event) }} />
                      <label htmlFor={q.option.b}>{q.option.b}</label>
                    </div>
                    <div className='options'>
                      <input type={'radio'} id='option3' name={q.id} className='me-3' />
                      <label htmlFor='option3'>{q.option.c}</label>
                    </div>
                    <div className='options'>
                      <input type={'radio'} id='option4' name={q.id} className='me-3' />
                      <label htmlFor='option4'>{q.option.d}</label>
                    </div>
                  </div>
                </div>
              )
            }
          </div>

          <div className='btns-div'>
            <button className='actionbtn py-3 px-5 me-5' onClick={() => { if (this.state.index > 0) { this.setState({ index: this.state.index - 1 }) } }}>Previous</button>
            <button className='actionbtn py-3 px-5 me-5' onClick={() => { if (this.state.index < (firstQuestions.length - 1)) { this.setState({ index: this.state.index + 1 }) } }}>Next</button>
          </div>

          <div className='reviewbtns-div row g-2'>
            {firstQuestions.map((q, index) =>
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
