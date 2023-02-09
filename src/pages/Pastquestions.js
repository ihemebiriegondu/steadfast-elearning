import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { BsCalculator, BsAlarm } from 'react-icons/bs'
import { TiArrowLeftThick, TiArrowRightThick } from 'react-icons/ti'
import Calculator from '../components/Calculator';

import axios from 'axios';

import '../css/Jamb.css'
import '../css/QuesTemp.css'

export default class Pastquestions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            showOffcanvas: false,
            showModal: false,
            index: 0,
            size: 1,

            loader: false,
            loadingPercent: 0,
            questions: [],
            updatedQuestions: [],
            alert: '',
            showAlert: false,

            totalScore: 0,
            cummulativeScore: 0,

            timer: '00:00:00',
            alertTimer: false,
        };
    }

    componentDidMount() {
        const getQuestions = async () => {
            this.setState({ loader: true })
            this.setState({ showAlert: false })
            let subject = localStorage.getItem('subjectApiName')
            let question;
            question = await axios("https://questions.aloc.com.ng/api/v2/q/30?subject=" + subject,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'AccessToken': 'ALOC-79089b2860a0a328f46c'
                    },
                    method: "GET",
                    onDownloadProgress: (progressEvent) => {
                        const { loaded } = progressEvent.event;
                        let percentage = Math.floor((loaded / 20000) * 100);
                        //console.log(percentage)
                        this.setState({ loadingPercent: percentage })
                    }
                }).catch((err) => {
                    this.setState({ alert: err.message });
                    this.setState({ showAlert: true });
                    console.log(err.message)
                })
            const JSONquestion = await question.data;

            this.setState({ questions: JSONquestion.data });

            //console.log(this.state.questions)

            let questionSample = JSONquestion.data;
            let questionArray = [];

            questionSample.forEach(question => {

                let questionName = question.question
                let questionId = question.id
                let questionSection = question.section
                let questionImage = question.image
                let questionSolution = question.solution

                let questionObject = {}

                //console.log(question.option)
                let options = []
                let correctOption = question.answer
                //console.log(correctOption)

                for (let x in question.option) {
                    /*console.log(x)
                    console.log(question.option[x])*/

                    let optionsValue = {}
                    optionsValue.id = x
                    optionsValue.checkId = questionId + x
                    optionsValue.name = question.option[x]
                    optionsValue.isAnswer = x === correctOption ? true : false
                    //console.log(optionsValue)

                    options.push(optionsValue)
                }
                //console.log(typeof question.option)
                //console.log(options)

                questionObject.type = "chemistry"
                questionObject.id = questionId
                questionObject.section = questionSection
                questionObject.name = questionName
                questionObject.image = questionImage
                questionObject.options = options
                questionObject.solution = questionSolution

                questionArray.push(questionObject)
                this.state.updatedQuestions.push(questionObject)
                this.setState({ loader: false });

                let startTime = new Date(new Date().setMinutes(new Date().getMinutes() + 20));

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

                this.setState({ timer: '00:20:00' });

                setInterval(() => {
                    startTimer();
                }, 1000)
            });

            //console.log(questionArray)
            //console.log(this.state.updatedQuestions)
        }

        getQuestions();

    }

    onAnswerOne(question, option) {
        let quiz = this.state.updatedQuestions;
        let q = quiz.find(x => x.id === question.id);
        q.options.forEach((x) => { x.selected = false; });
        q.options.find(x => x.checkId === option.checkId).selected = true;
    }

    //checking if an option is selected for the review
    isAnsweredOne = (q) => {
        return q.options.some(x => x.selected) ? 'Answered' : 'Not Answered';
    }

    isSubmitted = () => {
        let allQuestions = this.state.updatedQuestions

        let totalScore = 0

        allQuestions.forEach(question => {
            question.isCorrect = question.options.every(x => x.selected === x.isAnswer);

            if (question.isCorrect === true) {
                totalScore += 1;
            }
        })

        const cummulativeScore = parseFloat(totalScore / 30 * 100).toFixed(0);
        this.setState({ cummulativeScore: cummulativeScore })

        this.setState({ totalScore: totalScore });

        let scoreOffcanvas = document.querySelector(".display-score")
        scoreOffcanvas.classList.add("active")
    }


    render() {

        let allQuestions = this.state.updatedQuestions;
        let questionsDisplay = (allQuestions) ? allQuestions.slice(this.state.index, this.state.index + this.state.size) : [];

        const handleClose = () => this.setState({ show: false });
        const handleShow = () => this.setState({ show: true });
        const handleCloseOffcanvas = () => this.setState({ showOffcanvas: false });
        const handleShowOffcanvas = () => this.setState({ showOffcanvas: true });
        const handleCloseModal = () => this.setState({ showModal: false });
        const handleShowModal = () => this.setState({ showModal: true });

        const submitExamFunction = () => {
            let totalScore = 0

            allQuestions.forEach(question => {
                question.isCorrect = question.options.every(x => x.selected === x.isAnswer);

                if (question.isCorrect === true) {
                    totalScore += 1;
                }
            })
            //console.log(totalScore)
            const cummulativeScore = parseFloat(totalScore / 30 * 100).toFixed(0);
            this.setState({ cummulativeScore: cummulativeScore })

            this.setState({ totalScore: totalScore });

            let scoreOffcanvas = document.querySelector(".display-score")
            scoreOffcanvas.classList.add("active")

            handleCloseModal()
        }

        return (
            <div className='questions-page'>
                <div className='questions-subdiv'>
                    <div className='d-flex justify-content-between align-items-center question-header py-2 px-3'>
                        <p className='mb-0 me-2' onClick={handleShow}><BsCalculator className='me-2' />Calculator</p>
                        <div className={`d-flex align-items-center ${this.state.alertTimer === true ? 'alertTime' : 'normalTime'}`}>
                            <BsAlarm className='me-3 timer-icon mb-1 fs-5' />
                            <p className='timer mb-0 fs-4'>{this.state.timer}</p>
                        </div>
                    </div>

                    <div>
                        {
                            this.state.loader && (
                                <div className='pt-5 mx-4'>
                                    <div className={`alert alert-danger alert-dismissible fade ${this.state.showAlert === true ? 'show' : ''} `} role="alert">
                                        <p className='pb-0 mb-0'>{this.state.alert}</p>
                                    </div>
                                    <div className="text-center pt-5">Loading {this.state.loadingPercent + '%'}...</div>
                                </div>
                            )
                        }
                        <div className={`${this.state.loader === true ? 'd-none' : 'd-block'}`}>
                            <div className='quesTemp'>
                                <div>
                                    <h5 className='text-center mt-5'>{localStorage.getItem('subjectTitle')}</h5>
                                </div>
                                <div className=' px-3'>
                                    <div>
                                        <div className='ps-md-4 ps-0'>
                                            {
                                                questionsDisplay.map(q =>
                                                    <div key={q.id}>
                                                        <h4 className='question-instruction text-capitalize'>{q.section}</h4>
                                                        <img src={q.image} alt='' />
                                                        <p className='question'><span>{this.state.index + 1}. </span> <span dangerouslySetInnerHTML={{ __html: q.name }} /></p>
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
                                            <button className='actionbtn py-3 px-sm-5 px-3' onClick={() => { if (this.state.index > 0) { this.setState({ index: this.state.index - 1 }) } }}><TiArrowLeftThick /></button>
                                            <button className='actionbtn py-3 px-sm-5 px-3' onClick={() => { if (this.state.index < (allQuestions.length - 1)) { this.setState({ index: this.state.index + 1 }) } }}><TiArrowRightThick /></button>
                                        </div>

                                        <Offcanvas className='review-offcanvas' show={this.state.showOffcanvas} onHide={handleCloseOffcanvas}>
                                            <Offcanvas.Header closeButton>
                                                <Offcanvas.Title><h5>{localStorage.getItem('subjectTitle')} Review</h5></Offcanvas.Title>
                                            </Offcanvas.Header>
                                            <div className='reviewbtns-div row'>
                                                {allQuestions.map((q, index) =>
                                                    <div key={q.id} className="cursor-pointer col">
                                                        <div id={index} onClick={(e) => { (this.setState({ index: parseInt(e.target.id, q.length) })); handleCloseOffcanvas() }} className={`reviewbtn px-3 text-center py-2 rounded ${this.isAnsweredOne(q) === 'Answered' ? 'answered-review' : 'warning-review'}`}>{index + 1}</div>
                                                    </div>
                                                )}
                                            </div>
                                        </Offcanvas>

                                        <hr className='mt-4 w-75 m-auto text-danger' />

                                        <div className='d-flex justify-content-between other-action-div'>
                                            <button className='actionbtn py-3 px-sm-5 px-3' onClick={handleShowOffcanvas}>Review</button>
                                            <div className='submitbtn-div'>
                                                <button id='submitButton' className='py-3 px-sm-5 px-3' onClick={handleShowModal}>Submit Exam</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <Modal show={this.state.show} onHide={handleClose} className='calc mx-auto'>
                    <div className='calculator-body mx-auto'>
                        <div className='calculator-subdiv px-3 py-4'>
                            <Modal.Header closeButton className='pt-0 px-0'>
                                <Modal.Title className='pt-0'><h6 className=''>Calculator</h6></Modal.Title>
                            </Modal.Header>
                            <Calculator />
                        </div>
                    </div >
                </Modal>

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
                    <div className=''>
                        <div className='display-scorediv'>
                            <div className='pt-4 pb-3'>
                                <h2 className='text-center mb-0'>Result</h2>
                            </div>
                            <div className='px-4 mb-4'>
                                <p className='fw-semibold h5'><span className='score-info'>Name: </span><span className='score-info-info'>{localStorage.getItem("userName")}</span></p>
                            </div>
                            <div className='px-sm-4 px-2'>
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>Subjects</th>
                                            <th>Score</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>{localStorage.getItem('subjectTitle')}</th>
                                            <th>{this.state.cummulativeScore}</th>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                            <div className='submitbtn-div'>
                                <button className=''><Link to="/preview" state={{ questions: this.state.updatedQuestions }} className='text-decoration-none w-100 h-100 d-inline-block py-3 px-sm-5 px-3 text-white'>Preview Answers</Link></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
