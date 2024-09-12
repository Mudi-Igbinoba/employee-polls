import {
  ADD_QUESTION_TO_USER,
  RECEIVE_USERS,
  SAVE_ANSWER_TO_USER
} from '../actions/users';

export const users = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      };

    case SAVE_ANSWER_TO_USER: {
      const { authedUser, qid, answer } = action;

      return {
        ...state,

        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer
          }
        }
      };
    }

    case ADD_QUESTION_TO_USER:
      const { id, author } = action;

      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat(id)
        }
      };
    default:
      return state;
  }
};
