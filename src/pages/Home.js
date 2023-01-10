import React from 'react'
import userImg from '../assets/user-icon.png'
import MyCards from '../components/MyCards'
import '../css/home.css'

const Home = () => {
  return (
    <div className='dashboard'>
      <div className='top-nav d-flex justify-content-between align-items-baseline'>
        <h5>Hello, <span>Egondu</span></h5>
        <img src={userImg} alt='' />
      </div>
      <div className='middle-div'>
        <div className='row row-cols-lg-3 row-cols-md-2 row-cols-1 justify-content-center g-4'>
          <MyCards cardTitle="Practice Questions" />
          <MyCards cardTitle="Take an Exam"  />
        </div>
      </div>
    </div>
  )
}

export default Home