import React, { useState, useEffect } from 'react'
import { useUserAuth } from "../context/UserAuthContext";
import { HiOutlineSun } from 'react-icons/hi'
import { GiLaurelsTrophy } from 'react-icons/gi'
import { BiBadge } from 'react-icons/bi'
import { BsFillCloudSunFill, BsCloudMoonFill, BsMoonStars } from 'react-icons/bs'
import { TbCheckbox } from 'react-icons/tb'
import { FaCrown } from 'react-icons/fa'
import { MdSpeed } from 'react-icons/md'

import { firestore } from "../firebase";
import { collection, onSnapshot, query, orderBy, updateDoc, doc } from "firebase/firestore"

import '../css/dashboard.css'

const Dashboard = () => {

    const [averageTime, setAverageTime] = useState('');
    const [averageScore, setAverageScore] = useState(0);
    const [maxScore, setMaxScore] = useState(0);
    const [totalScoresLength, setTotalScoresLength] = useState(0);
    const [ascTopStudentsArray, setAscTopStudentsArray] = useState([]);
    const [TopStudentsArrayLongerThan3, setAscTopStudentsArrayLongerThan3] = useState(false);
    const [timeOfTheDay, setTimeOfTheDay] = useState('')

    const { user } = useUserAuth();
    const studentLists = collection(firestore, "student-list");
    const qStudent = query(studentLists, orderBy('Username', 'asc'))
    const topStudentsArray = []
    const docID = user.uid;

    useEffect(() => {
        const getTimeOfTheDay = () => {
            let date = new Date();
            let time = date.getHours()
            //console.log(date)
            //console.log(time)
            if (time < 12) {
                setTimeOfTheDay('Morning')
            } else if (time >= 12 && time < 16) {
                setTimeOfTheDay('Afternoon')
            } else if (time >= 16 && time < 19) {
                setTimeOfTheDay('Evening')
            } else if (time >= 19) {
                setTimeOfTheDay('Night')
            }
        }

        const deleteWeeklyStats = () => {
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

            const day = new Date();
            const dayOfTheWeek = days[day.getDay()];
            const time = day.getHours();
            const minute = day.getMinutes();
            //console.log(dayOfTheWeek)
            if (dayOfTheWeek === 'Sunday') {
                if (time === 23) {
                    if (minute === 59) {
                        const studentInfo = doc(firestore, "student-list", docID);
                        updateDoc(studentInfo, {
                            scores: [],
                            maxScore: '',
                            timeTaken: []
                        })
                    }
                }
            }
        }

        getTimeOfTheDay()
        deleteWeeklyStats()

    }, [setTimeOfTheDay, docID])


    onSnapshot(qStudent, (student) => {
        let students = []
        student.docs.forEach((doc) => {
            students.push({ ...doc.data(), id: doc.id })
        });
        //console.log(students)
        students.forEach(student => {

            //updating students person score informations
            if (student.id === user.uid) {
                //console.log(student)
                let scoresArray = student.scores
                let timeArray = student.timeTaken
                //console.log(timeArray)
                let totalScore = 0;
                let totalTime = 0;
                let maximumScore = 0;

                for (let i = 0; i < scoresArray.length; i++) {
                    //console.log(i)
                    totalScore = totalScore + scoresArray[i]
                    //console.log(totalScore)
                    if (scoresArray[i] > maximumScore) {
                        maximumScore = scoresArray[i]
                    }
                }

                for (let i = 0; i < timeArray.length; i++) {
                    totalTime = totalTime + timeArray[i];
                    //console.log(totalTime)
                }

                if (scoresArray.length === 0) {
                    setAverageScore(0)
                } else {
                    setAverageScore(parseFloat(totalScore / scoresArray.length).toFixed(0));
                }

                if (timeArray.length === 0) {
                    setAverageTime(0)
                } else {
                    let averageTimer = parseFloat(totalTime / timeArray.length).toFixed(0);
                    let averageHour = Math.floor(averageTimer / (60 * 60));
                    let averageMinute = Math.floor((averageTimer % (60 * 60)) / 60);
                    let HourInWords = averageHour + ' hr'
                    let MinInWords = averageMinute + ' mins'
                    let timeInWords = HourInWords + ' ' + MinInWords;

                    if (averageHour === 0) {
                        setAverageTime(MinInWords)
                    } else {
                        setAverageTime(timeInWords)
                    }
                }

                const studentInfo = doc(firestore, "student-list", docID);

                updateDoc(studentInfo, {
                    maxScore: maximumScore,
                })

                setTotalScoresLength(scoresArray.length);
                setMaxScore(maximumScore)


            }

            //console.log(student)
            let maxScoreObject = {}
            maxScoreObject.name = student.Username;
            maxScoreObject.score = student.maxScore;
            maxScoreObject.picture = student.imageURL;
            topStudentsArray.push(maxScoreObject)
        });

        localStorage.setItem('maxscore', maxScore)
        if (topStudentsArray.length >= 3) {
            setAscTopStudentsArrayLongerThan3(true)
            setAscTopStudentsArray(topStudentsArray.sort((a, b) => parseFloat(b.score) - parseFloat(a.score)));
        }

        //console.log(topStudentsArray)
        //console.log(ascTopStudentsArray)
    })


    return (
        <div className='dashboard-component'>
            <div className='dashboard-componentDiv'>
                <div className='userIntroDiv d-flex justify-content-between align-items-center'>
                    <div className='d-flex flex-column justify-content-start'>
                        <div className='greeting-div d-flex align-items-center mb-1'>
                            <BsFillCloudSunFill className={`me-2 mb-1 ${timeOfTheDay === 'Morning' ? 'd-inline-block' : 'd-none'}`} />
                            <HiOutlineSun className={`me-2 ${timeOfTheDay === 'Afternoon' ? 'd-inline-block' : 'd-none'}`} />
                            <BsCloudMoonFill className={`me-2 mb-1 ${timeOfTheDay === 'Evening' ? 'd-inline-block' : 'd-none'}`} />
                            <BsMoonStars className={`me-2 mb-1 ${timeOfTheDay === 'Night' ? 'd-inline-block' : 'd-none'}`} />
                            <p className='mb-0'>Good {timeOfTheDay}</p>
                        </div>
                        <div>
                            <h6 className='mb-0'>{user.displayName}</h6>
                        </div>
                    </div>
                    <div className='userImg'>
                        <img src={user.photoURL} id='displayPicture' alt=''></img>
                    </div>
                </div>

                <div className='testInfoDiv'>
                    <h6 className='mb-3 ms-2'>Weekly Statistics</h6>
                    <div className='exam-details'>
                        <div className='row row-cols-sm-2 row-cols-xl-4 m-0 g-2'>
                            <div className='d-flex align-items-center py-3 px-3 info-card shadow-sm'>
                                <div className='detailImgDiv'>
                                    <GiLaurelsTrophy className='detailImg' />
                                </div>
                                <div className='detailInfo'>
                                    <p className='mb-0'>Highest Score</p>
                                    <h5 className='mb-0'>{maxScore}</h5>
                                </div>
                            </div>
                            <div className='d-flex align-items-center py-3 px-3 info-card shadow-sm'>
                                <div className='detailImgDiv'>
                                    <BiBadge className='detailImg' />
                                </div>
                                <div className='detailInfo'>
                                    <p className='mb-0'>Average Score</p>
                                    <h5 className='mb-0'>{averageScore}</h5>
                                </div>
                            </div>
                            <div className='d-flex align-items-center py-3 px-3 info-card shadow-sm'>
                                <div className='detailImgDiv'>
                                    <MdSpeed className='detailImg' />
                                </div>
                                <div className='detailInfo'>
                                    <p className='mb-0'>Average Time</p>
                                    <h5 className='mb-0'>{averageTime}</h5>
                                </div>
                            </div>
                            <div className='d-flex align-items-center py-3 px-3 info-card shadow-sm'>
                                <div className='detailImgDiv'>
                                    <TbCheckbox className='detailImg' />
                                </div>
                                <div className='detailInfo'>
                                    <p className='mb-0'>Number of exams taken</p>
                                    <h5 className='mb-0'>{totalScoresLength}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='leaderboard'>
                    <h5 className='text-center'>Top students for this week</h5>

                    {
                        TopStudentsArrayLongerThan3 && (
                            <div className='top3 d-flex justify-content-center align-items-center'>
                                <div className='top3-students second d-flex flex-column justify-content-center align-items-center'>
                                    <div className='d-flex flex-column justify-content-center align-items-center'>
                                        <div className='img-div'>
                                            <img src={ascTopStudentsArray[1].picture} alt='' />
                                        </div>
                                        <div className='position'>
                                            <p>2</p>
                                        </div>
                                    </div>
                                    <div className='student-info d-flex flex-column justify-content-center align-items-center'>
                                        <h5 className='text-center'>{ascTopStudentsArray[1].name}</h5>
                                        <p className='text-center'>{ascTopStudentsArray[1].score}</p>
                                    </div>
                                </div>

                                <div className='top3-students first d-flex flex-column justify-content-center align-items-center'>
                                    <div className='d-flex flex-column justify-content-center align-items-center'>
                                        <FaCrown className='winner-crown' />
                                        <div className='img-div'>
                                            <img src={ascTopStudentsArray[0].picture} alt='' />
                                        </div>
                                        <div className='position'>
                                            <p>1</p>
                                        </div>
                                    </div>
                                    <div className='student-info d-flex flex-column justify-content-center align-items-center'>
                                        <h5 className='text-center'>{ascTopStudentsArray[0].name}</h5>
                                        <p className='text-center'>{ascTopStudentsArray[0].score}</p>
                                    </div>
                                </div>

                                <div className='top3-students third d-flex flex-column justify-content-center align-items-center'>
                                    <div className='d-flex flex-column justify-content-center align-items-center'>
                                        <div className='img-div'>
                                            <img src={ascTopStudentsArray[2].picture} alt='' />
                                        </div>
                                        <div className='position'>
                                            <p>3</p>
                                        </div>
                                    </div>
                                    <div className='student-info d-flex flex-column justify-content-center align-items-center'>
                                        <h5 className='text-center'>{ascTopStudentsArray[2].name}</h5>
                                        <p className='text-center'>{ascTopStudentsArray[2].score}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard