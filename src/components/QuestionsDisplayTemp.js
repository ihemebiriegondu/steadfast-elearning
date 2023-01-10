import React, { Component } from 'react'
import '../css/QuesTemp.css'
import { Tabs, Tab } from 'react-bootstrap';


export default class QuestionsDisplayTemp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "firstPaper",
      //const [key, setKey] = useState('firstPaper');
      index1: 0,
      size1: 1,

      index2: 0,
      size2: 1,

      index3: 0,
      size3: 1,

      index4: 0,
      size4: 1,
      //time: {},
      //seconds: 1800
    };
    //this.timer = 0;
    //this.startTimer = this.startTimer.bind(this);
    //this.countDown = this.countDown.bind(this);
  }

  //To keep selected options after pressing the next or previous button
  onAnswerOne(question, option) {

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

    q.options.find(x => x.checkId === option.checkId).selected = true;
  }

  onAnswerTwo(question, option) {
    let quiz = this.props.datas;
    //console.log(quiz)
    let quiz2 = quiz[1]
    //console.log(quiz1)
    let q = quiz2.find(x => x.id === question.id);
    //console.log(q)

    q.options.forEach((x) => { x.selected = false; });
    q.options.find(x => x.checkId === option.checkId).selected = true;
    //console.log(q.options.find(x => x.checkId === option.checkId))
  }

  onAnswerThree(question, option) {
    let quiz = this.props.datas;
    //console.log(quiz)
    let quiz3 = quiz[2]
    //console.log(quiz1)
    let q = quiz3.find(x => x.id === question.id);
    //console.log(q)

    q.options.forEach((x) => { x.selected = false; });
    q.options.find(x => x.checkId === option.checkId).selected = true;
    //console.log(q.options.find(x => x.checkId === option.checkId))
  }

  onAnswerFour(question, option) {
    let quiz = this.props.datas;
    //console.log(quiz)
    let quiz4 = quiz[3]
    //console.log(quiz1)
    let q = quiz4.find(x => x.id === question.id);
    //console.log(q)

    q.options.forEach((x) => { x.selected = false; });
    q.options.find(x => x.checkId === option.checkId).selected = true;
    //console.log(q.options.find(x => x.checkId === option.checkId))
  }

  //checking if an option is selected for the review
  isAnsweredOne = (q) => {
    return q.options.some(x => x.selected) ? 'Answered' : 'Not Answered';
  }

  isAnsweredTwo = (q) => {
    return q.options.some(x => x.selected) ? 'Answered' : 'Not Answered';
  }

  isAnsweredThree = (q) => {
    return q.options.some(x => x.selected) ? 'Answered' : 'Not Answered';
  }

  isAnsweredFour = (q) => {
    return q.options.some(x => x.selected) ? 'Answered' : 'Not Answered';
  }


  render() {

    let allQuestions = this.props.datas
    //console.log(allQuestions)
    let questionOne = allQuestions[0]
    //console.log(questionOne)
    let questionTwo = allQuestions[1]
    let questionThree = allQuestions[2]
    let questionFour = allQuestions[3]

    //For showing the questions one after the other instead of together on a page
    let questions1 = (questionOne) ? questionOne.slice(this.state.index1, this.state.index1 + this.state.size1) : [];
    //console.log(questions1)
    let questions2 = (questionTwo) ? questionTwo.slice(this.state.index2, this.state.index2 + this.state.size2) : [];
    let questions3 = (questionThree) ? questionThree.slice(this.state.index3, this.state.index3 + this.state.size3) : [];
    let questions4 = (questionFour) ? questionFour.slice(this.state.index4, this.state.index4 + this.state.size4) : [];

    const subjectNames = JSON.parse(localStorage.getItem("subjectNames"));
    //localStorage.removeItem("subjectNames")

    return (
      <div>
        <Tabs id="controlled-tab-example" activeKey={this.state.key} onSelect={(k) => this.setState({ key: k })} className="mb-3">
          <Tab eventKey="firstPaper" title="Use of English">
            <div className='quesTemp px-3'>
              <div>
                <div className='ps-4'>
                  {
                    questions1.map(q =>
                      <div key={q.id}>
                        <h4 className='question-instruction text-capitalize'>{q.section}</h4>
                        <img src={q.image} alt='' />
                        <p className='question'><span>{this.state.index1 + 1}. </span>{q.name}</p>
                        <div className='option-div ms-5'>
                          {
                            q.options.slice(0, -1).map(option =>
                              <div className='options' key={option.checkId}>
                                <span className='alphabetOption'>{option.id}</span>
                                <input id={option.checkId} checked={option.selected} name={q.id} type="radio" onChange={() => this.onAnswerOne(q, option)} />
                                <label htmlFor={option.checkId} className='ms-3'>
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
                  <button className='actionbtn py-3 px-5 me-5' onClick={() => { if (this.state.index1 > 0) { this.setState({ index1: this.state.index1 - 1 }) } }}>Previous</button>
                  <button className='actionbtn py-3 px-5 me-5' onClick={() => { if (this.state.index1 < (questionOne.length - 1)) { this.setState({ index1: this.state.index1 + 1 }) } }}>Next</button>
                </div>

                <div className='reviewbtns-div row g-2'>
                  {questionOne.map((q, index1) =>
                    <div key={q.id} className="cursor-pointer col">
                      <div id={index1} onClick={(e) => { (this.setState({ index1: parseInt(e.target.id, q.length) })); }} className={`reviewbtn px-3 text-center py-2 rounded`}>{index1 + 1}{this.isAnsweredOne(q)}</div>
                    </div>
                  )}
                </div>

                <hr className='mt-4 w-75 m-auto' />

                <div className='submitbtn-div'>
                  <button className='py-3 px-5'>Submit Exam</button>
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey="secondPaper" title={subjectNames[1]}>
            <div className='quesTemp px-3'>
              <div>
                <div className='ps-4'>
                  {
                    questions2.map(q =>
                      <div key={q.id}>
                        <h4 className='question-instruction text-capitalize'>{q.section}</h4>
                        <img src={q.image} alt='' />
                        <p className='question'><span>{this.state.index2 + 1}. </span>{q.name}</p>
                        <div className='option-div ms-5'>
                          {
                            q.options.slice(0, -1).map(option =>
                              <div className='options' key={option.checkId}>
                                <span className='alphabetOption'>{option.id}</span>
                                <input id={option.checkId} checked={option.selected} name={q.id} type="radio" onChange={() => this.onAnswerTwo(q, option)} />
                                <label htmlFor={option.checkId} className='ms-3'>
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
                  <button className='actionbtn py-3 px-5 me-5' onClick={() => { if (this.state.index2 > 0) { this.setState({ index2: this.state.index2 - 1 }) } }}>Previous</button>
                  <button className='actionbtn py-3 px-5 me-5' onClick={() => { if (this.state.index2 < (questionTwo.length - 1)) { this.setState({ index2: this.state.index2 + 1 }) } }}>Next</button>
                </div>

                <div className='reviewbtns-div row g-2'>
                  {questionTwo.map((q, index2) =>
                    <div key={q.id} className="cursor-pointer col">
                      <div id={index2} onClick={(e) => { (this.setState({ index2: parseInt(e.target.id, q.length) })); }} className={`reviewbtn px-3 text-center py-2 rounded`}>{index2 + 1}{this.isAnsweredTwo(q)}</div>
                    </div>
                  )}
                </div>

                <hr className='mt-4 w-75 m-auto' />

                <div className='submitbtn-div'>
                  <button className='py-3 px-5'>Submit Exam</button>
                </div>
              </div>
            </div>
          </Tab>



          <Tab eventKey="thirdPaper" title={subjectNames[2]}>
            <div className='quesTemp px-3'>
              <div>
                <div className='ps-4'>
                  {
                    questions3.map(q =>
                      <div key={q.id}>
                        <h4 className='question-instruction text-capitalize'>{q.section}</h4>
                        <img src={q.image} alt='' />
                        <p className='question'><span>{this.state.index3 + 1}. </span>{q.name}</p>
                        <div className='option-div ms-5'>
                          {
                            q.options.slice(0, -1).map(option =>
                              <div className='options' key={option.checkId}>
                                <span className='alphabetOption'>{option.id}</span>
                                <input id={option.checkId} checked={option.selected} name={q.id} type="radio" onChange={() => this.onAnswerThree(q, option)} />
                                <label htmlFor={option.checkId} className='ms-3'>
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
                  <button className='actionbtn py-3 px-5 me-5' onClick={() => { if (this.state.index3 > 0) { this.setState({ index3: this.state.index3 - 1 }) } }}>Previous</button>
                  <button className='actionbtn py-3 px-5 me-5' onClick={() => { if (this.state.index3 < (questionThree.length - 1)) { this.setState({ index3: this.state.index3 + 1 }) } }}>Next</button>
                </div>

                <div className='reviewbtns-div row g-2'>
                  {questionThree.map((q, index3) =>
                    <div key={q.id} className="cursor-pointer col">
                      <div id={index3} onClick={(e) => { (this.setState({ index3: parseInt(e.target.id, q.length) })); }} className={`reviewbtn px-3 text-center py-2 rounded`}>{index3 + 1}{this.isAnsweredThree(q)}</div>
                    </div>
                  )}
                </div>

                <hr className='mt-4 w-75 m-auto' />

                <div className='submitbtn-div'>
                  <button className='py-3 px-5'>Submit Exam</button>
                </div>
              </div>
            </div>
          </Tab>



          <Tab eventKey="forthPaper" title={subjectNames[3]}>
            <div className='quesTemp px-3'>
              <div>
                <div className='ps-4'>
                  {
                    questions4.map(q =>
                      <div key={q.id}>
                        <h4 className='question-instruction text-capitalize'>{q.section}</h4>
                        <img src={q.image} alt='' />
                        <p className='question'><span>{this.state.index4 + 1}. </span>{q.name}</p>
                        <div className='option-div ms-5'>
                          {
                            q.options.slice(0, -1).map(option =>
                              <div className='options' key={option.checkId}>
                                <span className='alphabetOption'>{option.id}</span>
                                <input id={option.checkId} checked={option.selected} name={q.id} type="radio" onChange={() => this.onAnswerFour(q, option)} />
                                <label htmlFor={option.checkId} className='ms-3'>
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
                  <button className='actionbtn py-3 px-5 me-5' onClick={() => { if (this.state.index4 > 0) { this.setState({ index4: this.state.index4 - 1 }) } }}>Previous</button>
                  <button className='actionbtn py-3 px-5 me-5' onClick={() => { if (this.state.index4 < (questionFour.length - 1)) { this.setState({ index4: this.state.index4 + 1 }) } }}>Next</button>
                </div>

                <div className='reviewbtns-div row g-2'>
                  {questionFour.map((q, index4) =>
                    <div key={q.id} className="cursor-pointer col">
                      <div id={index4} onClick={(e) => { (this.setState({ index4: parseInt(e.target.id, q.length) })); }} className={`reviewbtn px-3 text-center py-2 rounded`}>{index4 + 1}{this.isAnsweredFour(q)}</div>
                    </div>
                  )}
                </div>

                <hr className='mt-4 w-75 m-auto' />

                <div className='submitbtn-div'>
                  <button className='py-3 px-5'>Submit Exam</button>
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    )
  }
}
