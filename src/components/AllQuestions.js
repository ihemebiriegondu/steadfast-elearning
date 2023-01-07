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

    return (
        <div>
            <QuestionsDisplayTemp datas={questionsone} />
            {
                loader && (
                    <div class="">Loading...</div>
                )
            }
        </div>
    )
}

export default AllQuestions