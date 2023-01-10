import React from 'react'
import { Link } from 'react-router-dom'
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
          <Link className='text-decoration-none' to='/select subjects'><MyCards cardTitle="Take an Exam" /></Link>
        </div>
      </div>
    </div>
  )
}

export default Home