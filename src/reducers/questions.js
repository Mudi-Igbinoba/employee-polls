import {
  RECEIVE_QUESTIONS,
  SAVE_ANSWER_TO_QUESTION,
  SAVE_QUESTION
} from '../actions/questions';

export const questions = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      };

    case SAVE_ANSWER_TO_QUESTION: {
      const { authedUser, qid, answer } = action;

      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat([authedUser])
          }
        }
      };
    }
    case SAVE_QUESTION:
      const { question } = action;

      return {
        ...state,
        [question.id]: question
      };
    default:
      return state;
  }
};
