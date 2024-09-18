import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA';

describe('_saveQuestion', () => {
  it('will return the saved question', async () => {
    const question = {
      optionOneText: 'Eat dogs',
      optionTwoText: 'Eat cats',
      author: 'mtsamis'
    };
    var result = await _saveQuestion(question);
    expect(result.author).toBe('mtsamis');
    expect(result.optionOne.text).toBe('Eat dogs');
    expect(result.optionTwo.text).toBe('Eat cats');
    expect(result.optionOne.votes.length).toEqual(0);
    expect(result.optionTwo.votes.length).toEqual(0);
  });

  it('will return an error', async () => {
    await expect(_saveQuestion({})).rejects.toEqual(
      'Please provide optionOneText, optionTwoText, and author'
    );
  });
});

describe('_saveQuestionAnswer', () => {
  it('will return the saved question answer', async () => {
    const questionAnswer = {
      authedUser: 'zoshikanlu',
      qid: '8xf0y6ziyjabvozdd253nd',
      answer: 'optionOne'
    };
    var result = await _saveQuestionAnswer(questionAnswer);
    expect(result).toBeTruthy();
  });

  it('will return an error', async () => {
    await expect(_saveQuestionAnswer({})).rejects.toEqual(
      'Please provide authedUser, qid, and answer'
    );
  });
});
