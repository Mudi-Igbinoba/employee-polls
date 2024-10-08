import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { FcSurvey } from 'react-icons/fc';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';

const Login = ({ dispatch, user, setUser, userDetails }) => {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    setUser(e.target.value);
    dispatch(setAuthedUser(e.target.value));
    const select = e.currentTarget;
    if (select.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);
    navigate(from);
  };

  return (
    <div className='d-flex min-vh-100 justify-content-center align-items-center'>
      <Container className='py-5 text-center h-100'>
        <h1 className='display-4 text-primary' data-testid='heading'>
          Employee Polls
        </h1>

        {/* Logo */}
        <FcSurvey className='my-5 tw-text-9xl mx-auto' />

        <Row>
          <Col lg='4' className='mx-auto'>
            <Form className='px-5' noValidate validated={validated}>
              <Form.Group className='mb-3'>
                <Form.Label className='display-5 mb-3 fs-5 fw-semibold text-primary'>
                  Login as an existing user
                </Form.Label>
                <Form.Select
                  aria-label='Default select example'
                  value={user}
                  onChange={handleChange}
                  className='border-2 shadow border-secondary-subtle'
                  data-testid='user-option'
                >
                  <option value='' disabled>
                    Choose a user
                  </option>
                  {userDetails.map((opt) => (
                    <option key={opt.id} value={opt.id} className='flex gx-3'>
                      {opt.name}
                    </option>
                  ))}
                </Form.Select>
                {validated && (
                  <Form.Control.Feedback data-testid='user-success'>
                    User has been selected
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              {/* <Button
              as='a'
              href='/'
              variant='primary'
              onClick={(e) => e.preventDefault()}
              type='submit'
              className='px-4 py-2'
            >
              Submit
            </Button> */}
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = ({ users }, { user, setUser }) => {
  const userDetails = Object.values(users);
  return {
    userDetails,
    user,
    setUser
  };
};

export default connect(mapStateToProps)(Login);
