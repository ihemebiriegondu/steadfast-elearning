import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import { GrUserSettings, GrHomeRounded } from 'react-icons/gr'
import { Link } from 'react-router-dom'
import userImg from '../assets/user.png'
import MyCards from '../components/MyCards'
import '../css/home.css'

const Home = () => {

  return (
    <div className='dashboard'>
      <Tab.Container id="left-tabs-example" defaultActiveKey="home">
        <Tab.Content>
          <Tab.Pane eventKey="home">
            <div className='top-nav d-flex justify-content-between align-items-baseline'>
              <h5>Hello, <span>Egondu</span></h5>
              <img src={userImg} alt='' />
            </div>
            <div className='middle-div'>
              <div className='row row-cols-lg-3 row-cols-md-2 row-cols-1 justify-content-center g-4'>
                {/*<MyCards cardTitle="Practice Questions" />*/}
                <Link className='text-decoration-none' to='/select subjects'><MyCards cardTitle="Take an Exam" /></Link>
                <Link className='text-decoration-none' to='/settings'><MyCards cardTitle={"Settings"} /></Link>
              </div>
            </div>

          </Tab.Pane>

          <Tab.Pane eventKey="exams">
          </Tab.Pane>

          <Tab.Pane eventKey="settings">

          </Tab.Pane>
        </Tab.Content>

        <div className="footer shadow-sm">
          <Nav className='d-flex justify-content-between align-items-center px-4 py-2'>
            <Nav.Item className='mx-2'>
              <Nav.Link eventKey="home" className='p-0'>
                <p className='d-flex flex-column align-items-center m-0'><GrHomeRounded className='fs-5 tab-icon' /> <span>Home</span></p>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="exams" className='p-0'>Exams</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="settings" className='p-0'>
                <p className='d-flex flex-column align-items-center m-0'><GrUserSettings className='fs-5 tab-icon' /> <span>Home</span></p>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      </Tab.Container>
    </div>
  )
}

export default Home