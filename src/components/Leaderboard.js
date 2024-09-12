import React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';

const Leaderboard = ({ ldbData }) => {
  return (
    <section className='tw-py-20 text-center'>
      <h2 className='text-primary tw-text-4xl'>Leaderboard</h2>
      <p className='text-secondary tw-text-lg'>See who's leading the polls</p>
      <Table
        variant='light'
        bordered
        hover
        className='w-50 mx-auto border-secondary-subtle'
      >
        <thead>
          <tr>
            <th className='text-primary tw-text-xl'>Users</th>
            <th className='text-primary tw-text-xl'>Answered</th>
            <th className='text-primary tw-text-xl'>Created</th>
          </tr>
        </thead>
        <tbody>
          {ldbData.map((user) => (
            <tr key={user.id}>
              <td className='tw-text-start'>
                <div className='tw-flex tw-gap-x-4 tw-items-center tw-py-5'>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className='tw-size-20'
                  />

                  <div className='tw-space-y-2'>
                    <h2 className='tw-text-xl'>{user.name}</h2>
                    <p className='text-secondary tw-text-base tw-font-light'>
                      {user.id}
                    </p>
                  </div>
                </div>
              </td>
              <td>{user.totalAnswers}</td>
              <td>{user.totalQuestions}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  );
};

const mapStateToProps = ({ users }) => {
  const ldbData = Object.values(users)
    .map((user) => ({
      id: user.id,
      name: user.name,
      avatar: user.avatarURL,
      totalAnswers: Object.keys(user.answers).length,
      totalQuestions: user.questions.length,
      total: Object.keys(user.answers).length + user.questions.length
    }))
    .sort((a, b) => b.total - a.total);

  return {
    users,
    ldbData
  };
};

export default connect(mapStateToProps)(Leaderboard);
