import { saveQuestionAnswer } from '../utils/api';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_ANSWER_TO_QUESTION = 'SAVE_ANSWER_TO_QUESTION';

export const receiveQuestions = (questions) => {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
};

const saveAnswerToQuestion = ({ authedUser, qid, answer }) => {
  return {
    type: SAVE_ANSWER_TO_QUESTION,
    authedUser,
    qid,
    answer
  };
};

export const handleSaveAnswerToQuestion = (info) => {
  return (dispatch) => {
    dispatch(saveAnswerToQuestion(info));

    return saveQuestionAnswer(info).catch((e) => {
      console.warn('Error in saving answer:', e);
      dispatch(saveAnswerToQuestion(info));
      alert('There was an error saving your answer.Try again.');
    });
  };
};
