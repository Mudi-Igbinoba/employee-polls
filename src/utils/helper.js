export function formatDate(timestamp) {
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString('en-US');
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString();
}

export function formatQuestion(question, author, authedUser) {
  const { id, optionOne, optionTwo, timestamp } = question;
  const { id: authorId, avatarURL } = author;

  return {
    id,
    timestamp,
    name: authorId,
    options: [optionOne.text, optionTwo.text],
    votes: {
      1: optionOne.votes,
      2: optionTwo.votes
    },
    totalVotes: optionOne.votes.length + optionTwo.votes.length,
    avatar: avatarURL,
    hasAnswered:
      optionOne.votes.includes(authedUser) ||
      optionTwo.votes.includes(authedUser)
  };
}
