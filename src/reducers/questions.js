import { RECEIVE_QUESTIONS, SAVE_ANSWER } from '../actions/questions';

export const questions = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      };
    case SAVE_ANSWER: {
      const { authedUser, qid, answer } = action;

      return {
        ...state,
        users: {
          ...state.users,
          [authedUser]: {
            ...state.users[authedUser],
            answers: {
              ...state.users[authedUser].answers,
              [qid]: answer
            }
          }
        },
        questions: {
          ...state.questions,
          [qid]: {
            ...state.questions[qid],
            [answer]: {
              ...state.questions[qid][answer],
              votes: state.questions[qid][answer].votes.concat([authedUser])
            }
          }
        }
      };
    }
    default:
      return state;
  }
};
