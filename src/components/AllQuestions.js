import React, { useEffect, useState } from 'react'
import QuestionsDisplayTemp from '../components/QuestionsDisplayTemp'

const AllQuestions = () => {

    const [questionsone, setQuestionsone] = useState([])
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        const getQuestionsone = async () => {
            setLoader(true);

            let questionsone;
            questionsone = await fetch("https://questions.aloc.com.ng/api/v2/m?subject=english",
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'AccessToken': 'ALOC-79089b2860a0a328f46c'
                    },
                    method: "GET",
                })
            const quesJSONone = await questionsone.json();

            //console.log(quesJSONone.data)
            setQuestionsone(quesJSONone.data)

            setLoader(false);

            /*.then(function (res) { console.log(res) })
            .catch(function (res) { console.log(res) })*/
            return questionsone
        }
        getQuestionsone()
        //.then(console.log(questionsone))
    }, [setQuestionsone])

    const questionOne = () => {
        let firstQuestionSample = questionsone
        console.log(firstQuestionSample)

        let firstQuestion = []
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
                optionsValue.name = question.option[x]
                optionsValue.isAnswer = x === correctOption ? "True" : "False"
                //console.log(optionsValue)

                options.push(optionsValue)
            }
            //console.log(typeof question.option)
            //console.log(options)

            questionObject.id = questionId
            questionObject.section = questionSection
            questionObject.name = questionName
            questionObject.image = questionImage
            questionObject.options = options
            questionObject.solution = questionSolution

            //console.log(questionObject)

            firstQuestion.push(questionObject)
        });
        console.log(firstQuestion)
    }

    questionOne()

    return (
        <div>
            <QuestionsDisplayTemp datas={questionsone} />
            {
                loader && (
                    <div className="">Loading...</div>
                )
            }
        </div>
    )
}

export default AllQuestions