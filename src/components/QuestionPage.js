import React, { useState } from 'react';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { MdArrowBackIos } from 'react-icons/md';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { formatQuestion } from '../utils/helper';
import { handleSaveAnswerToQuestion } from '../actions/questions';
import { handleSaveAnswerToUser } from '../actions/users';

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const QuestionPage = ({
  authedUser,
  dispatch,
  qid,
  detail,
  navigate,
  chosenOption
}) => {
  const { name, avatar, options, hasAnswered, votes, totalVotes } = detail;
  const [option, setOption] = useState(chosenOption);
  console.log(option);

  const handleChange = (e) => {
    setOption(e.target.value);
    dispatch(
      handleSaveAnswerToQuestion({
        authedUser,
        qid,
        answer: e.target.value
      })
    );
    dispatch(
      handleSaveAnswerToUser({
        authedUser,
        qid,
        answer: e.target.value
      })
    );
  };

  return (
    <div className='bg-white vh-100'>
      <Container className='py-5'>
        <Button
          className='border-2 d-flex align-items-center px-4 py-2 fw-bold text-primary bg-white'
          onClick={() => navigate(-1)}
        >
          {' '}
          <MdArrowBackIos />
          Back
        </Button>

        <Row lg={2}>
          <Col className='mx-auto text-center'>
            <h3 className=' mb-4'>Poll by {name}</h3>
            <Image src={avatar} className='w-25 mx-auto mb-5' />
            <Form>
              <h4 className='mb-5'>Would you rather...</h4>
              <Form.Group className='d-flex justify-content-center align-items-center tw-gap-x-5'>
                {options.map((e, i) => (
                  <div key={i + 1}>
                    <Form.Check.Input
                      type='radio'
                      id={`option${i + 1}`}
                      value={i + 1 === 1 ? 'optionOne' : 'optionTwo'}
                      checked={
                        option === (i + 1 === 1 ? 'optionOne' : 'optionTwo')
                      }
                      onChange={(e) => handleChange(e)}
                      name='pollOptions'
                      className='tw-peer tw-sr-only'
                      disabled={hasAnswered && true}
                    />
                    <>
                      <Form.Check.Label
                        htmlFor={`option${i + 1}`}
                        className='peer-checked:tw-bg-slate-400 peer-checked:tw-text-white cursor-pointer peer-checked:tw-font-bold tw-border-2 border-primary rounded-top-4 border-bottom-0 px-4 py-3'
                      >
                        {e}
                      </Form.Check.Label>
                      <div className='bg-primary fw-semibold text-white py-1 tw-border-2 border-primary border-top-0'>
                        {hasAnswered
                          ? `${(
                              (votes[i + 1].length / totalVotes) *
                              100
                            ).toFixed(1)}%`
                          : 'Click'}
                      </div>
                      {hasAnswered && (
                        <p>
                          {votes[i + 1].length > 0
                            ? `${votes[i + 1].length} ${
                                votes[i + 1].length === 1 ? 'person' : 'people'
                              }`
                            : 'Nobody'}{' '}
                          picked this option
                        </p>
                      )}
                    </>
                  </div>
                ))}
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = ({ questions, users, authedUser }, props) => {
  const { qid } = props.router.params;
  const { navigate } = props.router;
  const question = questions[qid];
  const user = users[question.author];
  const detail = formatQuestion(question, user, authedUser);
  return {
    authedUser,
    chosenOption: users[authedUser].answers[qid] || '',
    detail,
    qid,
    navigate
  };
};

export default withRouter(connect(mapStateToProps)(QuestionPage));
