import React from 'react';
import { Navbar, Nav, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Menu = ({ setUser, authedUser, users }) => {
  return (
    <Navbar
      collapseOnSelect
      expand='lg'
      variant='dark'
      className=' p-3 bg-dark'
    >
      <Navbar.Toggle className='border-0' aria-controls='basic-navbar-nav' />

      <Navbar.Collapse>
        <Nav variant='underline' defaultActiveKey='/' className='me-auto'>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to='/'
              eventKey='/'
              // className='border border-white text-white'
            >
              Home
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link as={Link} to='/leaderboard' eventKey='/leaderboard'>
              Leaderboard
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link as={Link} to='/add' eventKey='/add'>
              Add
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>

      <div className='d-flex align-items-center'>
        <Navbar.Brand className='= d-flex align-items-center'>
          <h1 className='mb-0 fs-4 lead me-3'>{authedUser}</h1>
          <Image src={users[authedUser].avatarURL} width='40px' fluid />
        </Navbar.Brand>

        <Button
          className='bg-danger ms-lg-4 mb-0 text-white fw-bold border-0 py-1 px-3 rounded'
          onClick={() => setUser('')}
        >
          Logout
        </Button>
      </div>
    </Navbar>
  );
};

const mapStateToProps = ({ authedUser, users }) => {
  return {
    authedUser,
    users
  };
};

export default connect(mapStateToProps)(Menu);
