import { saveQuestionAnswer } from '../utils/api';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const SAVE_ANSWER_TO_USER = 'SAVE_ANSWER_TO_USER';

export const receiveUsers = (users) => {
  return {
    type: RECEIVE_USERS,
    users
  };
};

const saveAnswerToUser = ({ authedUser, qid, answer }) => {
  return {
    type: SAVE_ANSWER_TO_USER,
    authedUser,
    qid,
    answer
  };
};

export const handleSaveAnswerToUser = (info) => {
  return (dispatch) => {
    dispatch(saveAnswerToUser(info));

    return saveQuestionAnswer(info).catch((e) => {
      console.warn('Error in saving answer:', e);
      dispatch(saveAnswerToUser(info));
      alert('There was an error saving your answer.Try again.');
    });
  };
};
