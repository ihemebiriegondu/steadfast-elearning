import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { IoBookSharp } from 'react-icons/io5'
import { MdHomeFilled, MdMenu, MdSettings } from 'react-icons/md'
import { BiLogOutCircle } from 'react-icons/bi'
import '../css/home.css'

const Home = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <div className='dashboard'>
      <Tab.Container id="left-tabs-example" defaultActiveKey="home">
        <Tab.Content>
          <Tab.Pane eventKey="home">
            <div className='top-nav d-flex justify-content-between align-items-center'>
              <h5 className='mb-0'>Hello, <span>{user.displayName}</span></h5>
              <MdMenu className='menubar fs-1' onClick={handleShow} />
            </div>
            <div className='middle-div'>
              <h4>Exam history</h4>
              <div>
                <ul>
                  <li>
                    <p className='m-0'>12/9/2022</p>
                    <p className='m-0'>English, Mathematics, Chemistry, Physics</p>
                    <p className='m-0'>270</p>
                  </li>
                </ul>
              </div>
            </div>

          </Tab.Pane>

          <Tab.Pane eventKey="exams">
          </Tab.Pane>

          <Tab.Pane eventKey="settings">

          </Tab.Pane>
        </Tab.Content>

        <div className="footer shadow-sm d-block d-md-none">
          <Nav className='d-flex justify-content-between align-items-center px-4 py-2'>
            <Nav.Item className='mx-2'>
              <Nav.Link eventKey="home" className='p-0'>
                <p className='d-flex flex-column align-items-center m-0'><MdHomeFilled className='fs-2 tab-icon' /> <span>Home</span></p>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item className='mx-2'>
              <Nav.Link eventKey="exams" className='p-0'>
                <p className='d-flex flex-column align-items-center m-0'><IoBookSharp className='fs-5 tab-icon' /> <span>Exams</span></p>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item className='mx-2'>
              <Nav.Link eventKey="settings" className='p-0'>
                <p className='d-flex flex-column align-items-center m-0'><MdSettings className='fs-5 tab-icon' /> <span>Settings</span></p>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <div className='d-flex align-items-center'>
              <img src={user.imageURL} className='user-img' alt='' />
              <div className='ms-3'>
                <p className='m-0 offcanvasinfo'>{user.displayName}</p>
                <p className='m-0 offcanvasinfo'>{user.email}</p>
              </div>
            </div>
          </Offcanvas.Header>
          <Offcanvas.Body className='d-flex flex-column justify-content-between'>
            <Nav className='d-flex flex-column justify-content-start align-items-start py-2'>
              <Nav.Item className='mb-3'>
                <Nav.Link eventKey="home" className='p-0' onClick={handleClose}>
                  <p className='d-flex flex-column align-items-center m-0'><span>Home</span></p>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item className='mb-3'>
                <Link to='/select subjects' className='text-decoration-none p-0 nav-link'>
                  <p className='d-flex flex-column align-items-center m-0'><span>Take an exam</span></p>
                </Link>
              </Nav.Item>

              <Nav.Item className='mb-3'>
                <Nav.Link className='p-0'>
                  <p className='d-flex flex-column align-items-center m-0'><span>Study past questions</span></p>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item className='mb-3'>
                <Nav.Link eventKey="settings" className='p-0' onClick={handleClose}>
                  <p className='d-flex flex-column align-items-center m-0'><span>Settings</span></p>
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <div>
              <p onClick={() => handleLogout()} className='d-inline'><BiLogOutCircle className='me-3' />Logout</p>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </Tab.Container>
    </div>
  )
}

export default Home