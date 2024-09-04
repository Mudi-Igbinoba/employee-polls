import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { getInitialData } from '../utils/api';
import { setAuthedUser } from './authedUser';
import { receiveQuestions } from './questions';
import { receiveUsers } from './users';

// const AUTHED_ID = 'tylermcginnis';
// consider using a parameter to pass in selected auth id and use state
export const handleInitialData = (AUTHED_ID = '') => {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(setAuthedUser(AUTHED_ID));
      dispatch(hideLoading());
    });
  };
};
