import React, { useState } from 'react'

import { firestore } from "../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"

import '../css/leaderboard.css'

const Leaderboard = () => {

    const [ascTopStudentsArray, setAscTopStudentsArray] = useState([]);
    const [TopStudentsArrayLongerThan3, setAscTopStudentsArrayLongerThan3] = useState(false);

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
            //console.log(student)
            let maxScoreObject = {}
            maxScoreObject.name = student.Username;
            maxScoreObject.score = student.maxScore;
            maxScoreObject.picture = student.imageURL;
            topStudentsArray.push(maxScoreObject)
        });

        if (topStudentsArray.length >= 3) {
            setAscTopStudentsArrayLongerThan3(true)
            setAscTopStudentsArray(topStudentsArray.sort((a, b) => parseFloat(b.score) - parseFloat(a.score)));
        }

        //console.log(topStudentsArray)
        //console.log(ascTopStudentsArray)
    })

    return (
        <div className='leaderboardTab'>
            <div className='tops'>

                <div className='topsTitle'>
                    <h5 className='text-center'>Leaderboards</h5>
                    <p className='text-center'>October 13 - 18, 2021</p>
                </div>

                {
                    TopStudentsArrayLongerThan3 && (
                        <div className='top3 d-flex justify-content-center'>
                            <div className='top2nd d-flex justify-content-center flex-column mx-2 align-items-center'>
                                <div className='rateStar secondStar allstars'>2</div>
                                <div className='secondStarImg allstarsImg starImgs'>
                                </div>
                                <div className='d-flex flex-column align-items-center justify-content-center'>
                                    <p>{ascTopStudentsArray[1].name}</p>
                                    <span>{ascTopStudentsArray[1].score}</span>
                                </div>

                                <svg style={({ visibility: 'hidden', position: 'absolute' })} width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
                                    <defs>
                                        <filter id="roundImg1">
                                            {/* stdDeviation="4" affects the pointiness of the star */}
                                            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                                            <feImage xlinkHref={ascTopStudentsArray[1].picture} preserveAspectRatio='none' />
                                            <feComposite in="waves" in2="goo" operator="atop" />
                                            {/*<feMorphology in="SourceAlpha" result="expanded" operator="dilate" radius="1" />*/}
                                        </filter>

                                    </defs>
                                </svg>
                            </div>

                            <div className='top1st d-flex justify-content-center flex-column mx-2 align-items-center'>
                                <div className='rateStar firstStar allstars'>2</div>
                                <div className='firstStarImg allstarsImg starImgs'></div>
                                <div className='d-flex flex-column align-items-center justify-content-center'>
                                    <p>{ascTopStudentsArray[0].name}</p>
                                    <span>{ascTopStudentsArray[0].score}</span>
                                </div>

                                <svg style={({ visibility: 'hidden', position: 'absolute' })} width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
                                    <defs>
                                        <filter id="roundImg2">
                                            {/* stdDeviation="4" affects the pointiness of the star */}
                                            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                                            <feImage xlinkHref={ascTopStudentsArray[0].picture} preserveAspectRatio='none' />
                                            <feComposite in="waves" in2="goo" operator="atop" />
                                            {/*<feMorphology in="SourceAlpha" result="expanded" operator="dilate" radius="1" />*/}
                                        </filter>

                                    </defs>
                                </svg>
                            </div>

                            <div className='top3rd d-flex justify-content-center flex-column mx-2 align-items-center'>
                                <div className='rateStar thirdStar allstars'>2</div>
                                <div className='thirdStarImg allstarsImg starImgs'></div>
                                <div className='d-flex flex-column align-items-center justify-content-center'>
                                    <p>{ascTopStudentsArray[2].name}</p>
                                    <span>{ascTopStudentsArray[2].score}</span>
                                </div>

                                <svg style={({ visibility: 'hidden', position: 'absolute' })} width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
                                    <defs>
                                        <filter id="roundImg3">
                                            {/* stdDeviation="4" affects the pointiness of the star */}
                                            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                                            <feImage xlinkHref={ascTopStudentsArray[2].picture} preserveAspectRatio='none' />
                                            <feComposite in="waves" in2="goo" operator="atop" />
                                            {/*<feMorphology in="SourceAlpha" result="expanded" operator="dilate" radius="1" />*/}
                                        </filter>

                                    </defs>
                                </svg>
                            </div>

                            <svg style={({ visibility: 'hidden', position: 'absolute' })} width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
                                <defs>
                                    <filter id="round">
                                        {/* stdDeviation="4" affects the pointiness of the star */}
                                        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                                        {/*<feImage xlinkHref="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/Harry-Potter-1-.jpg" />*/}
                                        <feComposite in="waves" in2="goo" operator="atop" />
                                        {/*<feMorphology in="SourceAlpha" result="expanded" operator="dilate" radius="1" />*/}
                                    </filter>

                                </defs>
                            </svg>
                        </div>
                    )}

            </div>

            <div className='others'>
                <div className='others-subdiv'>
                    <div className='navtab'></div>

                    <div className='d-flex align-items-center justify-content-between mb-3'>
                        <div className='d-flex align-items-center'>
                            <div className='otherStar'>4</div>
                            <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/Harry-Potter-1-.jpg' alt='' />
                            <p className='mb-0'>Ihemebiri Egondu</p>
                        </div>
                        <div>
                            <span>350</span>
                        </div>
                    </div>
                    <div className='d-flex align-items-center justify-content-between mb-3'>
                        <div className='d-flex align-items-center'>
                            <div className='otherStar'>4</div>
                            <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/Harry-Potter-1-.jpg' alt='' />
                            <p className='mb-0'>Ihemebiri Egondu</p>
                        </div>
                        <div>
                            <span>350</span>
                        </div>
                    </div>
                    <div className='d-flex align-items-center justify-content-between mb-3'>
                        <div className='d-flex align-items-center'>
                            <div className='otherStar'>4</div>
                            <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/Harry-Potter-1-.jpg' alt='' />
                            <p className='mb-0'>Ihemebiri Egondu</p>
                        </div>
                        <div>
                            <span>350</span>
                        </div>
                    </div>
                    <div className='d-flex align-items-center justify-content-between mb-3'>
                        <div className='d-flex align-items-center'>
                            <div className='otherStar'>4</div>
                            <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/Harry-Potter-1-.jpg' alt='' />
                            <p className='mb-0'>Ihemebiri Egondu</p>
                        </div>
                        <div>
                            <span>350</span>
                        </div>
                    </div>
                    <div className='d-flex align-items-center justify-content-between mb-3'>
                        <div className='d-flex align-items-center'>
                            <div className='otherStar'>4</div>
                            <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/Harry-Potter-1-.jpg' alt='' />
                            <p className='mb-0'>Ihemebiri Egondu</p>
                        </div>
                        <div>
                            <span>350</span>
                        </div>
                    </div>
                </div>

                <svg style={({ visibility: 'hidden', position: 'absolute' })} width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <defs>
                        <filter id="smallround">
                            {/* stdDeviation="4" affects the pointiness of the star */}
                            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                        </filter>
                    </defs>
                </svg>
            </div>
        </div>
    )
}

export default Leaderboard