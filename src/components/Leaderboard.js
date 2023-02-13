import React from 'react'
import '../css/leaderboard.css'

const Leaderboard = () => {
    return (
        <div className='leaderboardTab'>
            <div className='tops'>

                <div className='topsTitle'>
                    <h5 className='text-center'>Leaderboards</h5>
                </div>

                <div className='top3 d-flex justify-content-center'>
                    <div className='top2nd d-flex justify-content-center flex-column mx-2 align-items-center'>
                        <div className='rateStar secondStar allstars'>2</div>
                        <div className='secondStarImg allstars starImgs'></div>
                        <div className='d-flex flex-column align-items-center justify-content-center'>
                            <p>Ihemebiri Egondu</p>
                            <span>350</span>
                        </div>
                    </div>

                    <div className='top1st d-flex justify-content-center flex-column mx-2 align-items-center'>
                        <div className='rateStar firstStar allstars'>2</div>
                        <div className='firstStarImg allstars starImgs'></div>
                        <div className='d-flex flex-column align-items-center justify-content-center'>
                            <p>Ihemebiri Egondu</p>
                            <span>350</span>
                        </div>
                    </div>

                    <div className='top3rd d-flex justify-content-center flex-column mx-2 align-items-center'>
                        <div className='rateStar thirdStar allstars'>2</div>
                        <div className='thirdStarImg allstars starImgs'></div>
                        <div className='d-flex flex-column align-items-center justify-content-center'>
                            <p>Ihemebiri Egondu</p>
                            <span>350</span>
                        </div>
                    </div>


                    <svg style={({ visibility: 'hidden', position: 'absolute' })} width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
                        <defs>
                            <filter id="round">
                                {/* stdDeviation="4" affects the pointiness of the star */}
                                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                            </filter>
                        </defs>
                    </svg>
                </div>
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