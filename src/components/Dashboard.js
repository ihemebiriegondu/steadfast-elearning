import React from 'react'
import { useUserAuth } from "../context/UserAuthContext";
import { HiOutlineSun } from 'react-icons/hi'
import { GiLaurelsTrophy } from 'react-icons/gi'
import { FaMedal } from 'react-icons/fa'
import { BiBadge } from 'react-icons/bi'
import { TbCheckbox } from 'react-icons/tb'
import { MdSpeed } from 'react-icons/md'

import '../css/dashboard.css'

const Dashboard = () => {

    const { user } = useUserAuth();

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
                                    <h5 className='mb-0'>300</h5>
                                </div>
                            </div>
                            <div className='d-flex align-items-center py-3 px-3 info-card shadow-sm'>
                                <div className='detailImgDiv'>
                                    <BiBadge className='detailImg' />
                                </div>
                                <div className='detailInfo'>
                                    <p className='mb-0'>Average Score</p>
                                    <h5 className='mb-0'>300</h5>
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
                                    <h5 className='mb-0'>5</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='leaderboard'>
                    <h5 className='mb-4 ms-2 text-center'>Top Students</h5>
                    <div className='top3 d-flex justify-content-center align-items-end ms-3'>
                        <div className='top3-Student second d-flex flex-column justify-content-center'>
                            <div className='d-flex flex-column justify-content-center align-items-center px-2'>
                                <FaMedal className='fs-1 medal mb-2' style={({ color: '#C0C0C0' })} />
                                <div className='img mb-3'>
                                    <img src={user.photoURL} alt=''></img>
                                </div>
                                <p className='name mb-1 text-center'>Ihemebiri Egondu</p>
                                <div className='score mb-2'><p className='mb-0'>350</p></div>

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
                                    <img src={user.photoURL} alt=''></img>
                                </div>
                                <p className='name mb-1 text-center'>Ihemebiri Egondu</p>
                                <div className='score mb-2'><p className='mb-0'>350</p></div>
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
                                    <img src={user.photoURL} alt=''></img>
                                </div>
                                <p className='name mb-1 text-center'>Ihemebiri Egondu</p>
                                <div className='score mb-2'><p className='mb-0'>350</p></div>
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
                    <div className='other-ranks mx-2 py-3'>
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard