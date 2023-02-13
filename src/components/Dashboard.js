import React, { useState } from 'react'
import { useUserAuth } from "../context/UserAuthContext";
import { HiOutlineSun } from 'react-icons/hi'
import { GiLaurelsTrophy } from 'react-icons/gi'
import { FaMedal } from 'react-icons/fa'
import { BiBadge } from 'react-icons/bi'
import { TbCheckbox } from 'react-icons/tb'
import { MdSpeed } from 'react-icons/md'

import { firestore } from "../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"

import '../css/dashboard.css'

const Dashboard = () => {

    const [averageScore, setAverageScore] = useState(0);
    const [maxScore, setMaxScore] = useState(0);
    const [totalScoresLength, setTotalScoresLength] = useState(0);
    const [ascTopStudentsArray, setAscTopStudentsArray] = useState([]);
    const [TopStudentsArrayLongerThan3, setAscTopStudentsArrayLongerThan3] = useState(false);

    const { user } = useUserAuth();
    const studentLists = collection(firestore, "student-list");
    const qStudent = query(studentLists, orderBy('Username', 'asc'))
    const topStudentsArray = []

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
                //console.log(scoresArray)
                let totalScore = 0;
                let maximumScore = 0;

                for (let i = 0; i < scoresArray.length; i++) {
                    //console.log(i)
                    totalScore = totalScore + scoresArray[i]
                    //console.log(totalScore)
                    if (scoresArray[i] > maximumScore) {
                        maximumScore = scoresArray[i]
                    }
                }
                if (scoresArray.length === 0) {
                    setAverageScore(0)
                } else {
                    setAverageScore(parseFloat(totalScore / scoresArray.length).toFixed(0));
                }
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
                            <HiOutlineSun className='me-2' />
                            <p className='mb-0'>Good Afternoon</p>
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
                    <h6 className='mb-3 ms-2'>Exam Statistics</h6>
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
                                    <h5 className='mb-0'>1hr 20mins</h5>
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
                    <h5 className='mb-4 ms-2 text-center'>Top Students</h5>
                    {
                        TopStudentsArrayLongerThan3 && (
                            <div className='top3 d-flex justify-content-center align-items-end ms-3'>
                                <div className='top3-Student second d-flex flex-column justify-content-center'>
                                    <div className='d-flex flex-column justify-content-center align-items-center px-2'>
                                        <FaMedal className='fs-1 medal mb-2' style={({ color: '#C0C0C0' })} />
                                        <div className='img mb-3'>
                                            <img src={ascTopStudentsArray[1].picture} alt=''></img>
                                        </div>
                                        <p className='name mb-1 text-center'>{ascTopStudentsArray[1].name}</p>
                                        <div className='score mb-2'><p className='mb-0'>{ascTopStudentsArray[1].score}</p></div>

                                    </div>
                                    <div className='ratingDiv'>
                                        <div className='ratings-top'>

                                        </div>
                                        <div className='ratings-bottom'>
                                            <h1 className='text-center'>2</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className='top3-Student first d-flex flex-column justify-content-center'>
                                    <div className='d-flex flex-column justify-content-center align-items-center px-2'>
                                        <FaMedal className='fs-1 medal mb-2' style={({ color: '#FFD700' })} />
                                        <div className='img mb-3'>
                                            <img src={ascTopStudentsArray[0].picture} alt=''></img>
                                        </div>
                                        <p className='name mb-1 text-center'>{ascTopStudentsArray[0].name}</p>
                                        <div className='score mb-2'><p className='mb-0'>{ascTopStudentsArray[0].score}</p></div>
                                    </div>
                                    <div className='ratingDiv'>
                                        <div className='ratings-top'>

                                        </div>
                                        <div className='ratings-bottom'>
                                            <h1 className='text-center'>1</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className='top3-Student third d-flex flex-column justify-content-center'>
                                    <div className='d-flex flex-column justify-content-center align-items-center px-2'>
                                        <FaMedal className='fs-1 medal mb-2' style={({ color: '#CD7F32' })} />
                                        <div className='img mb-3'>
                                            <img src={ascTopStudentsArray[2].picture} alt=''></img>
                                        </div>
                                        <p className='name mb-1 text-center'>{ascTopStudentsArray[2].name}</p>
                                        <div className='score mb-2'><p className='mb-0'>{ascTopStudentsArray[2].score}</p></div>
                                    </div>
                                    <div className='ratingDiv'>
                                        <div className='ratings-top'>

                                        </div>
                                        <div className='ratings-bottom'>
                                            <h1 className='text-center'>3</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    {/*<div className='other-ranks mx-2 py-3'>
                        <div className='d-flex align-items-center py-3 px-3 info-card shadow-sm mx-3 mb-3'>
                            <div className='rank me-3'><span className='pb-1'>4</span></div>
                            <div className='detailImgDiv'>
                                <img src={user.photoURL} alt=''></img>
                            </div>
                            <div className='detailInfo'>
                                <p className='mb-0'>Ihemebiri Egondu</p>
                                <h5 className='mb-0'>240</h5>
                            </div>
                        </div>
                        <div className='d-flex align-items-center py-3 px-3 info-card shadow-sm mx-3 mb-3'>
                            <div className='rank me-3'><span className='pb-1'>5</span></div>
                            <div className='detailImgDiv'>
                                <img src={user.photoURL} alt=''></img>
                            </div>
                            <div className='detailInfo'>
                                <p className='mb-0'>Ihemebiri Egondu</p>
                                <h5 className='mb-0'>240</h5>
                            </div>
                        </div>
                        <div className='d-flex align-items-center py-3 px-3 info-card shadow-sm mx-3 mb-3'>
                            <div className='rank me-3'><span className='pb-1'>6</span></div>
                            <div className='detailImgDiv'>
                                <img src={user.photoURL} alt=''></img>
                            </div>
                            <div className='detailInfo'>
                                <p className='mb-0'>Ihemebiri Egondu</p>
                                <h5 className='mb-0'>240</h5>
                            </div>
                        </div>
                        <div className='d-flex align-items-center py-3 px-3 info-card shadow-sm mx-3 mb-3'>
                            <div className='rank me-3'><span className='pb-1'>7</span></div>
                            <div className='detailImgDiv'>
                                <img src={user.photoURL} alt=''></img>
                            </div>
                            <div className='detailInfo'>
                                <p className='mb-0'>Ihemebiri Egondu</p>
                                <h5 className='mb-0'>240</h5>
                            </div>
                        </div>
                        <div className='d-flex align-items-center py-3 px-3 info-card shadow-sm mx-3 mb-3'>
                            <div className='rank me-3'><span className='pb-1'>8</span></div>
                            <div className='detailImgDiv'>
                                <img src={user.photoURL} alt=''></img>
                            </div>
                            <div className='detailInfo'>
                                <p className='mb-0'>Ihemebiri Egondu</p>
                                <h5 className='mb-0'>240</h5>
                            </div>
                        </div>
                        <div className='d-flex align-items-center py-3 px-3 info-card shadow-sm mx-3 mb-3'>
                            <div className='rank me-3'><span className='pb-1'>9</span></div>
                            <div className='detailImgDiv'>
                                <img src={user.photoURL} alt=''></img>
                            </div>
                            <div className='detailInfo'>
                                <p className='mb-0'>Ihemebiri Egondu</p>
                                <h5 className='mb-0'>240</h5>
                            </div>
                        </div>
                        <div className='d-flex align-items-center py-3 px-3 info-card shadow-sm mx-3 mb-3'>
                            <div className='rank me-3'><span className='pb-1'>10</span></div>
                            <div className='detailImgDiv'>
                                <img src={user.photoURL} alt=''></img>
                            </div>
                            <div className='detailInfo'>
                                <p className='mb-0'>Ihemebiri Egondu</p>
                                <h5 className='mb-0'>240</h5>
                            </div>
                        </div>
                </div>*/}
                </div>
            </div>
        </div>
    )
}

export default Dashboard