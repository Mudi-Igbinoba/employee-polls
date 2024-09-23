import React, { useState } from 'react';
import { connect } from 'react-redux';
import Question from './Question';
import { Col, Container, Form, Row } from 'react-bootstrap';

const Dashboard = ({ questionIds, userAnswersIds }) => {
  const [category, setCategory] = useState('unanswered');
  const answered = questionIds.filter((id) => userAnswersIds.includes(id));
  const unanswered = questionIds.filter((id) => !userAnswersIds.includes(id));
  const handleChange = (e) => {
    setCategory(e.target.value);
  };
  return (
    <div className='bg-white tw-h-screen'>
      <Container className='py-5 text-center'>
        <Form className='mb-5'>
          <Form.Group className='mb-3'>
            <Form.Label className='display-5 mb-3 fs-5 fw-semibold text-primary text-start'>
              Filter by poll
            </Form.Label>
            <Form.Select
              aria-label='Default select example'
              value={category}
              onChange={handleChange}
              className='border-2 shadow border-secondary-subtle'
              data-testid='user-option'
            >
              <option value='unanswered'>Show unanswered polls</option>

              <option value='answered'>Show answered polls</option>
            </Form.Select>
          </Form.Group>
        </Form>
        <Row className='gy-5'>
          {category === 'unanswered' ? (
            <Col
              xs={12}
              className='border bg-light-subtle shadow border-primary-subtle  rounded p-3 '
            >
              <h2 className='mb-2 fs-2 display-1 text-primary'>
                New Questions
              </h2>
              <hr />
              <Row xs={3} className='mt-2 gx-5 list-unstyled gy-3'>
                {unanswered.map((id) => (
                  <Col key={id}>
                    <Question id={id} />
                  </Col>
                ))}
              </Row>
            </Col>
          ) : (
            <Col
              xs={12}
              className='border bg-light-subtle shadow border-primary-subtle rounded p-3 '
            >
              <h2 className='mb-2 fs-2 display-1 text-primary'>Done</h2>
              <hr />
              <Row xs={3} className='mt-2 gx-5 gy-4 list-unstyled gy-3'>
                {answered.map((id) => (
                  <Col key={id}>
                    <Question id={id} />
                  </Col>
                ))}
              </Row>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = ({ questions, users, authedUser }) => ({
  authedUser,
  userAnswersIds: Object.keys(users[authedUser].answers),
  questionIds: Object.keys(questions).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  )
});

export default connect(mapStateToProps)(Dashboard);
