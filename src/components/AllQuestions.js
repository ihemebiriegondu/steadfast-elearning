import React, { useEffect, useState } from 'react'
import QuestionsDisplayTemp from '../components/QuestionsDisplayTemp'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FaQuoteLeft, FaQuoteRight, FaHeart } from 'react-icons/fa'
import { BsDash } from 'react-icons/bs'

const AllQuestions = () => {

    //console.log(isSubmitted)
    //console.log(subjects)
    //console.log(subjects[0])

    const [questionsone, setQuestionsone] = useState([])
    const [questionstwo, setQuestionstwo] = useState([])
    const [questionsthree, setQuestionsthree] = useState([])
    const [questionsfour, setQuestionsfour] = useState([])
    const [loader, setLoader] = useState('');
    const [loadingPercent, setLoadingPercent] = useState(0);
    const [motQuotes, setMotQuotes] = useState('')
    const [showQuote, setShowQuote] = useState(false)

    const navigate = useNavigate();

    const allQuestions = []
    let firstQuestion = []
    let secondQuestion = []
    let thirdQuestion = []
    let forthQuestion = []

    const getMotivationalQuote = () => {

        let randomNo = Math.floor(Math.random() * 1642);

        fetch("https://type.fit/api/quotes")
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                //console.log(randomNo)
                //console.log(data)
                //console.log(data[randomNo]);
                setMotQuotes(data[randomNo])
                setShowQuote(true)
            });
    }

    useEffect(() => {
        const subjects = JSON.parse(localStorage.getItem("subjects"));

        try {
            const getQuestionsone = async () => {
                setLoader(true);

                setTimeout(getMotivationalQuote(), 10000);
       

                let questionsone;
                questionsone = await axios("https://questions.aloc.com.ng/api/v2/m?subject=" + subjects[0],
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'AccessToken': 'QB-4574212e169b8f95e68a'
                        },
                        method: "GET",
                        onDownloadProgress: (progressEvent) => {
                            const { loaded } = progressEvent.event;
                            let percentage = Math.floor((loaded / 25000) * 100);
                            //console.log(percentage)
                            //console.log(loaded)
                            setLoadingPercent(percentage)
                        }
                    }).catch((err) => {
                        alert(err.message)
                        navigate("/dashboard");
                    })
                const quesJSONone = await questionsone.data;

                //console.log(quesJSONone.data)
                setQuestionsone(quesJSONone.data)

                localStorage.setItem('loading', 'false')
                setLoader(false);

                /*.then(function (res) { console.log(res) })
                .catch(function (res) { console.log(res) })*/
                return questionsone
            }


            const getQuestionstwo = async () => {

                let questionstwo;
                questionstwo = await fetch("https://questions.aloc.com.ng/api/v2/q/20?subject=" + subjects[1],
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'AccessToken': 'QB-4574212e169b8f95e68a'
                        },
                        method: "GET",
                    }).catch((err) => console.log(err))
                const quesJSONtwo = await questionstwo.json();

                //console.log(quesJSONtwo.data)
                setQuestionstwo(quesJSONtwo.data)

                /*.then(function (res) { console.log(res) })
                .catch(function (res) { console.log(res) })*/
                return questionstwo
            }


            const getQuestionsthree = async () => {

                let questionsthree;
                questionsthree = await fetch("https://questions.aloc.com.ng/api/v2/q/20?subject=" + subjects[2],
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'AccessToken': 'QB-4574212e169b8f95e68a'
                        },
                        method: "GET",
                    }).catch((err) => console.log(err))
                const quesJSONthree = await questionsthree.json();

                //console.log(quesJSONthree.data)
                setQuestionsthree(quesJSONthree.data)

                /*.then(function (res) { console.log(res) })
                .catch(function (res) { console.log(res) })*/
                return questionsthree
            }


            const getQuestionsfour = async () => {

                let questionsfour;
                questionsfour = await fetch("https://questions.aloc.com.ng/api/v2/q/20?subject=" + subjects[3],
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'AccessToken': 'QB-4574212e169b8f95e68a'
                        },
                        method: "GET",
                    }).catch((err) => console.log(err))
                const quesJSONfour = await questionsfour.json();

                //console.log(quesJSONfour.data)
                setQuestionsfour(quesJSONfour.data)

                /*.then(function (res) { console.log(res) })
                .catch(function (res) { console.log(res) })*/
                return questionsfour

            }

            getQuestionsone()
            //.then(console.log(questionsone))
            getQuestionstwo()
            getQuestionsthree()
            getQuestionsfour()
            //localStorage.removeItem("subjects")

        } catch (error) {
            console.log(error)
        }


    }, [setQuestionsone, setQuestionstwo, setQuestionsthree, navigate])

    const questionOne = () => {
        let firstQuestionSample = questionsone
        //console.log(firstQuestionSample)

        firstQuestionSample.forEach(question => {

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

            //console.log(questionObject)

            firstQuestion.push(questionObject)
        });
        //console.log(firstQuestion)
        allQuestions.push(firstQuestion)
    }

    const questionTwo = () => {
        let secondQuestionSample = questionstwo
        //console.log(secondQuestionSample)

        secondQuestionSample.forEach(question => {

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

            questionObject.type = "english"
            questionObject.id = questionId
            questionObject.section = questionSection
            questionObject.name = questionName
            questionObject.image = questionImage
            questionObject.options = options
            questionObject.solution = questionSolution

            //console.log(questionObject)

            secondQuestion.push(questionObject)
        });
        //console.log(secondQuestion)
        allQuestions.push(secondQuestion)
    }

    const questionThree = () => {
        let thirdQuestionSample = questionsthree
        //console.log(thirdQuestionSample)

        thirdQuestionSample.forEach(question => {

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

            questionObject.type = "maths"
            questionObject.id = questionId
            questionObject.section = questionSection
            questionObject.name = questionName
            questionObject.image = questionImage
            questionObject.options = options
            questionObject.solution = questionSolution

            //console.log(questionObject)

            thirdQuestion.push(questionObject)
        });
        //console.log(thirdQuestion)
        allQuestions.push(thirdQuestion)
    }

    const questionFour = () => {
        let forthQuestionSample = questionsfour
        //console.log(forthQuestionSample)

        forthQuestionSample.forEach(question => {

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

            questionObject.type = "biology"
            questionObject.id = questionId
            questionObject.section = questionSection
            questionObject.name = questionName
            questionObject.image = questionImage
            questionObject.options = options
            questionObject.solution = questionSolution

            //console.log(questionObject)

            forthQuestion.push(questionObject)
        });
        //console.log(forthQuestion)
        allQuestions.push(forthQuestion)
    }

    questionOne()
    questionTwo()
    questionThree()
    questionFour()

    //console.log(allQuestions)

    //setAllQuestions(AllQuestions.push(questionOne))

    return (
        <div>
            {
                loader && (
                    <div>
                        <div className="text-center pt-5">Loading {loadingPercent + '%'} ...</div>
                        <div className={`quotes ${showQuote === true ? 'show' : 'hide'}`}>
                            <h5>Quotes of the day</h5>
                            <div>
                                <FaQuoteLeft className='mb-2' />
                                <p>{motQuotes.text}</p>
                                <FaQuoteRight className='right ms-auto' />
                                <span><BsDash /> {motQuotes.author}</span>
                            </div>
                            <p className='made mb-0'>Made with <FaHeart className='text-danger ms-1 fs-5' /></p>
                            <hr className='mt-0' />
                            <button className='mt-4 d-flex justify-content-center mx-auto' onClick={() => getMotivationalQuote()}>New Quote</button>
                        </div>
                    </div>
                )
            }
            <div className={`${loader === true ? 'd-none' : 'd-block'}`}>
                <QuestionsDisplayTemp datas={allQuestions} />
            </div>
        </div>
    )
}

export default AllQuestions
