import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { MdMenu } from 'react-icons/md'
import { BiLogOutCircle } from 'react-icons/bi'
import '../css/home.css'
import Settings from '../components/Settings';
import Dashboard from '../components/Dashboard';
import logo from '../assets/wine_logo-removebg-preview.png'
import Leaderboard from '../components/Leaderboard';


const Home = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { logOut, user } = useUserAuth();
  localStorage.setItem("userName", user.displayName)
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.clear()
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  /*{user.displayName.split(" ")[0]} */
  return (
    <div className='dashboard'>
      <Tab.Container id="left-tabs-example" defaultActiveKey="home">
        <div className='top-nav d-flex align-items-center'>
          <MdMenu className='menubar fs-2' onClick={handleShow} />
          <h2 className="mb-0 mt-2 fw-normal me-1 ms-4 school-name">SPS</h2>
          <img src={logo} alt="" className='mt-1' style={({ width: '30px', height: '30px', objectFit: 'cover' })}></img>
        </div>
        <Tab.Content>
          <Tab.Pane eventKey="home">
            <div>
              <Dashboard />
              <Nav className='pb-4 justify-content-center' style={({ background: 'rgb(75, 5, 5)' })}>
                <Nav.Item className='mb-3 mt-4 text-center'>
                  <Nav.Link eventKey="leaderboard" className='p-0' onClick={handleClose}>
                    <p className='d-flex flex-column align-items-center m-0 text-decoration-underline' style={({ color: 'rgb(247, 219, 219)' })}><span>View leaderboard</span></p>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </Tab.Pane>

          <Tab.Pane eventKey="leaderboard">
              <Leaderboard />
          </Tab.Pane>

          <Tab.Pane eventKey="settings">
            <Settings />
          </Tab.Pane>
        </Tab.Content>


        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <div className='d-flex align-items-center'>
              <div className='user-img'>
                <img src={user.photoURL} alt='' />
              </div>
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
                <Link to='/select subject' className='text-decoration-none p-0 nav-link'>
                  <p className='d-flex flex-column align-items-center m-0'><span>Study past questions</span></p>
                </Link>
              </Nav.Item>

              <Nav.Item className='mb-3'>
                <Nav.Link eventKey="leaderboard" className='p-0' onClick={handleClose}>
                  <p className='d-flex flex-column align-items-center m-0'><span>Leaderboard</span></p>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item className='mb-3'>
                <Nav.Link eventKey="settings" className='p-0' onClick={handleClose}>
                  <p className='d-flex flex-column align-items-center m-0'><span>Settings</span></p>
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <div>
              <p onClick={() => handleLogout()} className='d-inline' style={({ cursor: 'pointer' })} ><BiLogOutCircle className='me-3' />Logout</p>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </Tab.Container>
    </div>
  )
}

export default Home