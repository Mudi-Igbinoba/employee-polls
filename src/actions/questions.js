import { saveQuestionAnswer } from '../utils/api';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_ANSWER = 'SAVE_ANSWER';

export const receiveQuestions = (questions) => {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
};

const saveAnswer = ({ authedUser, qid, answer }) => {
  return {
    type: SAVE_ANSWER,
    authedUser,
    qid,
    answer
  };
};

export const handleSaveAnswer = (info) => {
  return (dispatch) => {
    dispatch(saveAnswer(info));

    return saveQuestionAnswer(info).catch((e) => {
      console.warn('Error in saving answer:', e);
      dispatch(saveAnswer(info));
      alert('There was an error saving your answer.Try again.');
    });
  };
};
