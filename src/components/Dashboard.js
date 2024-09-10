import React from 'react';
import { connect } from 'react-redux';
import Question from './Question';
import { Col, Container, Row } from 'react-bootstrap';

const Dashboard = ({ questionIds, userAnswersIds }) => {
  const answered = questionIds.filter((id) => userAnswersIds.includes(id));
  const unanswered = questionIds.filter((id) => !userAnswersIds.includes(id));

  return (
    <div className='bg-white'>
      <Container className='py-5 text-center'>
        <Row className='gy-5'>
          <Col
            xs={12}
            className='border bg-light-subtle shadow border-primary-subtle  rounded p-3 '
          >
            <h2 className='mb-2 fs-2 display-1 text-primary'>New Questions</h2>
            <hr />
            <Row xs={3} className='mt-2 gx-5 list-unstyled gy-3'>
              {unanswered.map((id) => (
                <Col key={id}>
                  <Question id={id} />
                </Col>
              ))}
            </Row>
          </Col>

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
