import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';
import { BsCalculator, BsAlarm } from 'react-icons/bs'
import { TiArrowLeftThick, TiArrowRightThick } from 'react-icons/ti'
import Calculator from '../components/Calculator';

import '../css/Jamb.css'

export default class Pastquestions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            showModal: false,
            index: 0,
            size: 1,

            loader: false,
            questions: [],
            updatedQuestions: [],

            newtotalScoreArray: [],
            totalScore: 0,

            timer: '00:00:00',
            alertTimer: false,
        };
    }

    componentDidMount() {
        const getQuestions = async () => {
            this.setState({ loader: true })
            let subject = localStorage.getItem('subjectApiName')
            let question;
            question = await fetch("https://questions.aloc.com.ng/api/v2/q/30?subject=" + subject,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'AccessToken': 'ALOC-79089b2860a0a328f46c'
                    },
                    method: "GET",
                }).catch((err) => console.log(err))
            const JSONquestion = await question.json();

            this.setState({ questions: JSONquestion.data });
            this.setState({ loader: false });

            //console.log(this.state.questions)

            let questionSample = this.state.questions
            let questionArray = []

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
            });

            //console.log(questionArray)
            console.log(this.state.updatedQuestions)
        }

        getQuestions();

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

        if (this.props.loader === false) {
            setInterval(() => {
                startTimer();
            }, 1000)
        }
    }

    render() {

        let allQuestions = this.state.updatedQuestions;
        let questionsDisplay = (allQuestions) ? allQuestions.slice(this.state.index, this.state.index + this.state.size) : [];

        const handleClose = () => this.setState({ show: false });
        const handleShow = () => this.setState({ show: true });



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
                                <div className="text-center pt-5">Loading...</div>
                            )
                        }
                        <div className={`${this.state.loader === true ? 'd-none' : 'd-block'}`}>
                            <div className='quesTemp'>

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

                                        {/*<Offcanvas className='review-offcanvas' show={this.state.show} onHide={handleClose}>
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
                                        </Offcanvas> */}

                                        {/*<hr className='mt-4 w-75 m-auto text-danger' />

                                        <div className='d-flex justify-content-between other-action-div'>
                                            <button className='actionbtn py-3 px-sm-5 px-3' onClick={handleShow1}>Review</button>
                                            <div className='submitbtn-div'>
                                                <button id='submitButton' className='py-3 px-sm-5 px-3' onClick={handleShowModal}>Submit Exam</button>
                                            </div>
                                        </div> */}
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

            </div>
        )
    }
}
