import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleAddQuestion } from '../actions/questions';

const NewQuestion = ({ authedUser, dispatch }) => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [options, setOptions] = useState({
    optionOne: '',
    optionTwo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setOptions((prevData) => {
      return {
        ...prevData,
        [name]: value
      };
    });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      dispatch(
        handleAddQuestion(options.optionOne, options.optionTwo, authedUser)
      );
      setValidated(true);

      setTimeout(() => {
        navigate('/');
      }, 750);
    }
  };

  return (
    <div className=''>
      <Container className='tw-py-20 text-center'>
        <h2 className='text-primary tw-text-4xl'>Would you rather?</h2>
        <p className='text-secondary tw-text-lg'>Create your own poll</p>

        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className='py-3'
        >
          <Form.Group className='mb-3'>
            <Form.Label>First Option</Form.Label>
            <Form.Control
              onChange={handleChange}
              name='optionOne'
              value={options.optionOne}
              type='text'
              placeholder='Option One'
              required
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Second Option</Form.Label>
            <Form.Control
              onChange={handleChange}
              name='optionTwo'
              value={options.optionTwo}
              type='text'
              placeholder='Option Two'
              required
            />
          </Form.Group>
          <Button
            variant='primary'
            type='submit'
            className='mt-2 disabled:tw-cursor-not-allowed text-white bg-dark tw-border-2 fw-semibold px-4 py-2'
            disabled={!options.optionOne || !options.optionTwo}
          >
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser
  };
};

export default connect(mapStateToProps)(NewQuestion);
