import React from 'react';
import { connect } from 'react-redux';
import { formatDate, formatQuestion } from '../utils/helper';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const Question = ({ id, question, authedUser }) => {
  return (
    <Card
      id={id}
      className='h-100 text-center rounded shadow-sm border border-secondary-subtle'
    >
      <Card.Body className='px-3 pt-3'>
        <Card.Title className='mb-3 text-primary fs-5'>
          {question.name}
        </Card.Title>
        <Card.Subtitle className='text-secondary fs-6 fw-light'>
          {formatDate(question.timestamp)}
        </Card.Subtitle>
      </Card.Body>

      <Card.Footer className='py-3'>
        <Button
          as={Link}
          to={`/question/${id}`}
          className='text-dark bg-primary-subtle border-primary-subtle fw-semibold px-4 py-2'
        >
          Show
        </Button>
      </Card.Footer>
    </Card>
  );
};

const mapStateToProps = ({ authedUser, users, questions }, { id }) => {
  const question = questions[id];
  return {
    authedUser,
    question: formatQuestion(question, users[question.author], authedUser)
  };
};

export default connect(mapStateToProps)(Question);
