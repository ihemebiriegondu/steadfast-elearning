import React, { Component } from 'react'
import { TiArrowLeftThick, TiArrowRightThick } from 'react-icons/ti'
import '../css/QuesTemp.css'
import { Tabs, Tab, Modal } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import DisplayScore from './DisplayScore';
import { BsAlarm } from 'react-icons/bs'

import { auth, firestore } from "../firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore"


export default class QuestionsDisplayTemp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "firstPaper",
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      //const [key, setKey] = useState('firstPaper');
      //const [show, setShow] = useState(false);
      showModal: false,
      index1: 0,
      size1: 1,

      index2: 0,
      size2: 1,

      index3: 0,
      size3: 1,

      index4: 0,
      size4: 1,

      newtotalScoreArray: [],
      totalScore: 0,

      timer: '00:00:00',
      alertTimer: false,
    };
  }


  componentDidMount() {

    let startTime = new Date(new Date().setHours(new Date().getHours() + 1));

    const startTimer = () => {
      const total = Date.parse(startTime) - Date.parse(new Date());
      const seconds = Math.floor((total / 1000) % 60);
      const minutes = Math.floor((total / 1000 / 60) % 60);
      const hours = Math.floor((total / 1000 / 60 / 60) % 24);

      if (total > 0) {

        let newTime = (hours > 9 ? hours : '0' + hours) + ':' +
          (minutes > 9 ? minutes : '0' + minutes) + ':' +
          (seconds > 9 ? seconds : '0' + seconds)

        this.setState({ timer: newTime })
        //console.log(total)

        if (total <= 60000) {
          this.setState({ alertTimer: true })
        }
      } else if (total === 0) {
        this.setState({ alertTimer: false })
        this.isSubmitted()
      }
    }

    this.setState({ timer: '01:00:00' });

    if (localStorage.getItem('loading') === 'false') {
      setInterval(() => {
        startTimer();
      }, 1000)
    }

    //console.log(localStorage.getItem('loading'))
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

  isSubmitted = () => {
    let allQuestions = this.props.datas
    //console.log(allQuestions)
    let questionOne = allQuestions[0]
    //console.log(questionOne)
    let questionTwo = allQuestions[1]
    let questionThree = allQuestions[2]
    let questionFour = allQuestions[3]

    let totalScoreArray = []
    let firstPaperScore = 0
    let secondPaperScore = 0
    let thirdPaperScore = 0
    let forthPaperScore = 0

    questionOne.forEach(question => {
      //console.log(question)
      //console.log(question.options.every(x => x.selected === x.isAnswer))

      //checking thorugh the displayed questions for the selected options and assigning them to a variable question.isCorrect
      question.isCorrect = question.options.every(x => x.selected === x.isAnswer);

      //checking if the selected options is true
      if (question.isCorrect === true) {

        //console.log("corect")
        //adding to the total score
        firstPaperScore += 1;
      }
    })

    questionTwo.forEach(question => {
      //console.log(question)
      //console.log(question.options.every(x => x.selected === x.isAnswer))

      //checking thorugh the displayed questions for the selected options and assigning them to a variable question.isCorrect
      question.isCorrect = question.options.every(x => x.selected === x.isAnswer);

      //checking if the selected options is true
      if (question.isCorrect === true) {

        //console.log("corect")
        //adding to the total score
        secondPaperScore += 1;
      }
    })

    questionThree.forEach(question => {
      //console.log(question)
      //console.log(question.options.every(x => x.selected === x.isAnswer))

      //checking thorugh the displayed questions for the selected options and assigning them to a variable question.isCorrect
      question.isCorrect = question.options.every(x => x.selected === x.isAnswer);

      //checking if the selected options is true
      if (question.isCorrect === true) {

        //console.log("corect")
        //adding to the total score
        thirdPaperScore += 1;
      }
    })

    questionFour.forEach(question => {
      //console.log(question)
      //console.log(question.options.every(x => x.selected === x.isAnswer))

      //checking thorugh the displayed questions for the selected options and assigning them to a variable question.isCorrect
      question.isCorrect = question.options.every(x => x.selected === x.isAnswer);

      //checking if the selected options is true
      if (question.isCorrect === true) {

        //console.log("corect")
        //adding to the total score
        forthPaperScore += 1;
      }
    })

    const newfirstPaper = parseFloat(firstPaperScore / 40 * 100).toFixed(0);
    const newsecondPaper = parseFloat(secondPaperScore / 20 * 100).toFixed(0);
    const newthirdPaper = parseFloat(thirdPaperScore / 20 * 100).toFixed(0);
    const newforthPaper = parseFloat(forthPaperScore / 20 * 100).toFixed(0);


    totalScoreArray.push(newfirstPaper)
    totalScoreArray.push(newsecondPaper)
    totalScoreArray.push(newthirdPaper)
    totalScoreArray.push(newforthPaper)

    let newtotalScore = parseInt(newfirstPaper) + parseInt(newsecondPaper) + parseInt(newthirdPaper) + parseInt(newforthPaper)
    //console.log(totalScore)
    //console.log(totalScoreArray)

    this.setState({ totalScore: newtotalScore });
    this.setState({ newtotalScoreArray: totalScoreArray });

    let scoreOffcanvas = document.querySelector(".display-score")
    scoreOffcanvas.classList.add("active")
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

    const handleClose1 = () => this.setState({ show1: false });
    const handleShow1 = () => this.setState({ show1: true });

    const handleClose2 = () => this.setState({ show2: false });
    const handleShow2 = () => this.setState({ show2: true });

    const handleClose3 = () => this.setState({ show3: false });
    const handleShow3 = () => this.setState({ show3: true });

    const handleClose4 = () => this.setState({ show4: false });
    const handleShow4 = () => this.setState({ show4: true });

    const handleCloseModal = () => this.setState({ showModal: false })
    const handleShowModal = () => this.setState({ showModal: true })



    const submitExamFunction = () => {

      let totalScoreArray = []
      let firstPaperScore = 0
      let secondPaperScore = 0
      let thirdPaperScore = 0
      let forthPaperScore = 0

      questionOne.forEach(question => {
        //console.log(question)
        //console.log(question.options.every(x => x.selected === x.isAnswer))

        //checking thorugh the displayed questions for the selected options and assigning them to a variable question.isCorrect
        question.isCorrect = question.options.every(x => x.selected === x.isAnswer);

        //checking if the selected options is true
        if (question.isCorrect === true) {

          //console.log("corect")
          //adding to the total score
          firstPaperScore += 1;
        }
      })

      questionTwo.forEach(question => {
        //console.log(question)
        //console.log(question.options.every(x => x.selected === x.isAnswer))

        //checking thorugh the displayed questions for the selected options and assigning them to a variable question.isCorrect
        question.isCorrect = question.options.every(x => x.selected === x.isAnswer);

        //checking if the selected options is true
        if (question.isCorrect === true) {

          //console.log("corect")
          //adding to the total score
          secondPaperScore += 1;
        }
      })

      questionThree.forEach(question => {
        //console.log(question)
        //console.log(question.options.every(x => x.selected === x.isAnswer))

        //checking thorugh the displayed questions for the selected options and assigning them to a variable question.isCorrect
        question.isCorrect = question.options.every(x => x.selected === x.isAnswer);

        //checking if the selected options is true
        if (question.isCorrect === true) {

          //console.log("corect")
          //adding to the total score
          thirdPaperScore += 1;
        }
      })

      questionFour.forEach(question => {
        //console.log(question)
        //console.log(question.options.every(x => x.selected === x.isAnswer))

        //checking thorugh the displayed questions for the selected options and assigning them to a variable question.isCorrect
        question.isCorrect = question.options.every(x => x.selected === x.isAnswer);

        //checking if the selected options is true
        if (question.isCorrect === true) {

          //console.log("corect")
          //adding to the total score
          forthPaperScore += 1;
        }
      })

      const newfirstPaper = parseFloat(firstPaperScore / 40 * 100).toFixed(0);
      const newsecondPaper = parseFloat(secondPaperScore / 20 * 100).toFixed(0);
      const newthirdPaper = parseFloat(thirdPaperScore / 20 * 100).toFixed(0);
      const newforthPaper = parseFloat(forthPaperScore / 20 * 100).toFixed(0);


      totalScoreArray.push(newfirstPaper)
      totalScoreArray.push(newsecondPaper)
      totalScoreArray.push(newthirdPaper)
      totalScoreArray.push(newforthPaper)

      let newtotalScore = parseInt(newfirstPaper) + parseInt(newsecondPaper) + parseInt(newthirdPaper) + parseInt(newforthPaper)
      //console.log(totalScore)
      //console.log(totalScoreArray)

      this.setState({ totalScore: newtotalScore });
      this.setState({ newtotalScoreArray: totalScoreArray });

      let user = auth.currentUser;
      const docID = user.uid;
      let maxScore = localStorage.getItem('maxscore');
      //console.log(user);
      const studentInfo = doc(firestore, "student-list", docID);

      updateDoc(studentInfo, {
        scores: arrayUnion(newtotalScore),
        maxScore: maxScore
      })


      let scoreOffcanvas = document.querySelector(".display-score")
      scoreOffcanvas.classList.add("active")
      localStorage.removeItem('loading')

      handleCloseModal()
    }



    return (
      <div>
        <div className='info-div d-flex justify-content-center align-items-center py-2'>
          <div className={`d-flex align-items-center ${this.state.alertTimer === true ? 'alertTime' : 'normalTime'}`}>
            <BsAlarm className='me-3 timer-icon mb-1' />
            <p className='timer'>{this.state.timer}</p>
          </div>
        </div>
        <div className='quesTemp'>
          <Tabs id="controlled-tab-example" activeKey={this.state.key} onSelect={(k) => this.setState({ key: k })} className="mb-3">
            <Tab eventKey="firstPaper" title="English">
              <div className=' px-3'>
                <div>
                  <div className='ps-md-4 ps-0'>
                    {
                      questions1.map(q =>
                        <div key={q.id}>
                          <h4 className='question-instruction text-capitalize'>{q.section}</h4>
                          <img src={q.image} alt='' />
                          <p className='question'><span>{this.state.index1 + 1}. </span> <span dangerouslySetInnerHTML={{ __html: q.name }} /></p>
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

                  <div className='directionbtns'>
                    <button className='actionbtn py-3 px-sm-5 px-3' onClick={() => { if (this.state.index1 > 0) { this.setState({ index1: this.state.index1 - 1 }) } }}><TiArrowLeftThick /></button>
                    <button className='actionbtn py-3 px-sm-5 px-3' onClick={() => { if (this.state.index1 < (questionOne.length - 1)) { this.setState({ index1: this.state.index1 + 1 }) } }}><TiArrowRightThick /></button>
                  </div>

                  <Offcanvas className='review-offcanvas' show={this.state.show1} onHide={handleClose1}>
                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title><h5>{subjectNames[0]} Review</h5></Offcanvas.Title>
                    </Offcanvas.Header>
                    <div className='reviewbtns-div row'>
                      {questionOne.map((q, index1) =>
                        <div key={q.id} className="cursor-pointer col">
                          <div id={index1} onClick={(e) => { (this.setState({ index1: parseInt(e.target.id, q.length) })); handleClose1() }} className={`reviewbtn px-3 text-center py-2 rounded ${this.isAnsweredOne(q) === 'Answered' ? 'answered-review' : 'warning-review'}`}>{index1 + 1}</div>
                        </div>
                      )}
                    </div>
                  </Offcanvas>

                  <hr className='mt-4 w-75 m-auto text-danger' />

                  <div className='d-flex justify-content-between other-action-div'>
                    <button className='actionbtn py-3 px-sm-5 px-3' onClick={handleShow1}>Review</button>
                    <div className='submitbtn-div'>
                      <button id='submitButton' className='py-3 px-sm-5 px-3' onClick={handleShowModal}>Submit Exam</button>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="secondPaper" title={subjectNames[1]}>
              <div className='quesTemp px-3'>
                <div>
                  <div className='ps-md-4 ps-0'>
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

                  <div className='directionbtns'>
                    <button className='actionbtn py-3 px-sm-5 px-3' onClick={() => { if (this.state.index2 > 0) { this.setState({ index2: this.state.index2 - 1 }) } }}><TiArrowLeftThick /></button>
                    <button className='actionbtn py-3 px-sm-5 px-3' onClick={() => { if (this.state.index2 < (questionTwo.length - 1)) { this.setState({ index2: this.state.index2 + 1 }) } }}><TiArrowRightThick /></button>
                  </div>

                  <Offcanvas className='review-offcanvas' show={this.state.show2} onHide={handleClose2}>
                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title><h5>{subjectNames[1]} Review</h5></Offcanvas.Title>
                    </Offcanvas.Header>
                    <div className='reviewbtns-div row'>
                      {questionTwo.map((q, index2) =>
                        <div key={q.id} className="cursor-pointer col">
                          <div id={index2} onClick={(e) => { (this.setState({ index2: parseInt(e.target.id, q.length) })); handleClose2() }} className={`reviewbtn px-3 text-center py-2 rounded ${this.isAnsweredTwo(q) === 'Answered' ? 'answered-review' : 'warning-review'}`}>{index2 + 1}</div>
                        </div>
                      )}
                    </div>
                  </Offcanvas>

                  <hr className='mt-4 w-75 m-auto text-danger' />

                  <div className='d-flex justify-content-between other-action-div'>
                    <button className='actionbtn py-3 px-sm-5 px-3' onClick={handleShow2}>Review</button>
                    <div className='submitbtn-div'>
                      <button className='py-3 px-sm-5 px-3' onClick={handleShowModal}>Submit Exam</button>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>



            <Tab eventKey="thirdPaper" title={subjectNames[2]}>
              <div className='quesTemp px-3'>
                <div>
                  <div className='ps-md-4 ps-0'>
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

                  <div className='directionbtns'>
                    <button className='actionbtn py-3 px-sm-5 px-3' onClick={() => { if (this.state.index3 > 0) { this.setState({ index3: this.state.index3 - 1 }) } }}><TiArrowLeftThick /></button>
                    <button className='actionbtn py-3 px-sm-5 px-3' onClick={() => { if (this.state.index3 < (questionThree.length - 1)) { this.setState({ index3: this.state.index3 + 1 }) } }}><TiArrowRightThick /></button>
                  </div>

                  <Offcanvas className='review-offcanvas' show={this.state.show3} onHide={handleClose3}>
                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title><h5>{subjectNames[2]} Review</h5></Offcanvas.Title>
                    </Offcanvas.Header>
                    <div className='reviewbtns-div row'>
                      {questionThree.map((q, index3) =>
                        <div key={q.id} className="cursor-pointer col">
                          <div id={index3} onClick={(e) => { (this.setState({ index3: parseInt(e.target.id, q.length) })); handleClose3() }} className={`reviewbtn px-3 text-center py-2 rounded ${this.isAnsweredThree(q) === 'Answered' ? 'answered-review' : 'warning-review'}`}>{index3 + 1}</div>
                        </div>
                      )}
                    </div>
                  </Offcanvas>

                  <hr className='mt-4 w-75 m-auto text-danger' />

                  <div className='d-flex justify-content-between other-action-div'>
                    <button className='actionbtn py-3 px-sm-5 px-3' onClick={handleShow3}>Review</button>
                    <div className='submitbtn-div'>
                      <button className='py-3 px-sm-5 px-3' onClick={handleShowModal}>Submit Exam</button>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>



            <Tab eventKey="forthPaper" title={subjectNames[3]}>
              <div className='quesTemp px-3'>
                <div>
                  <div className='ps-md-4 ps-0'>
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

                  <div className='directionbtns'>
                    <button className='actionbtn py-3 px-sm-5 px-3' onClick={() => { if (this.state.index4 > 0) { this.setState({ index4: this.state.index4 - 1 }) } }}><TiArrowLeftThick /></button>
                    <button className='actionbtn py-3 px-sm-5 px-3' onClick={() => { if (this.state.index4 < (questionFour.length - 1)) { this.setState({ index4: this.state.index4 + 1 }) } }}><TiArrowRightThick /></button>
                  </div>

                  <Offcanvas className='review-offcanvas' show={this.state.show4} onHide={handleClose4}>
                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title><h5>{subjectNames[3]} Review</h5></Offcanvas.Title>
                    </Offcanvas.Header>
                    <div className='reviewbtns-div row'>
                      {questionFour.map((q, index4) =>
                        <div key={q.id} className="cursor-pointer col">
                          <div id={index4} onClick={(e) => { (this.setState({ index4: parseInt(e.target.id, q.length) })); handleClose4() }} className={`reviewbtn px-3 text-center py-2 rounded ${this.isAnsweredFour(q) === 'Answered' ? 'answered-review' : 'warning-review'}`}>{index4 + 1}</div>
                        </div>
                      )}
                    </div>
                  </Offcanvas>

                  <hr className='mt-4 w-75 m-auto text-danger' />

                  <div className='d-flex justify-content-between other-action-div'>
                    <button className='actionbtn py-3 px-sm-5 px-3' onClick={handleShow4}>Review</button>
                    <div className='submitbtn-div'>
                      <button className='py-3 px-sm-5 px-3' onClick={handleShowModal}>Submit Exam</button>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>

          <Modal aria-labelledby="contained-modal-title-vcenter" centered show={this.state.showModal} onHide={handleCloseModal} className="">
            <Modal.Body className="submitModal">
              <h6 className='text-center'>Are you sure you want to submit?</h6>
              <div className='d-flex justify-content-between mt-4 px-5 modal-submit-btns'>
                <button onClick={handleCloseModal}>No</button>
                <button onClick={() => { submitExamFunction(); }}>Yes</button>
              </div>
            </Modal.Body>
          </Modal>


          <div className='display-score'>
            <DisplayScore scores={this.state.newtotalScoreArray} total={this.state.totalScore} subjects={subjectNames} newdatas={this.props.datas} />
          </div>
        </div>
      </div>
    )
  }
}
