import React from 'react';
import { useEffect, useState } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Login from './Login';
import Dashboard from './Dashboard';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';
import Menu from './Menu';
import QuestionPage from './QuestionPage';
import NewQuestion from './NewQuestion';
import Leaderboard from './Leaderboard';
import NoMatch from './NoMatch';

function App({ dispatch, loading }) {
  const [authedUser, setAuthedUser] = useState('');

  useEffect(() => {
    dispatch(handleInitialData(authedUser));
  }, [authedUser]);

  return (
    <>
      <LoadingBar style={{ backgroundColor: 'blue', height: '5px' }} />
      {!loading && <Menu user={authedUser} setUser={setAuthedUser} />}
      <main className='bg-primary-subtle block min-vh-100'>
        {!loading ? (
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/add' element={<NewQuestion />} />

            <Route path='/leaderboard' element={<Leaderboard />} />
            <Route path='/question/:qid' element={<QuestionPage />} />
            <Route path='/login' element={<Navigate to='/' />} />
            <Route path='*' element={<NoMatch />} />
          </Routes>
        ) : (
          <Routes>
            <Route
              path='/login'
              element={<Login user={authedUser} setUser={setAuthedUser} />}
            />

            <Route path='*' element={<Navigate to='/login' />} />
          </Routes>
        )}
      </main>
    </>
  );
}

const mapStateToProps = ({ authedUser }) => ({
  loading: !authedUser
});

export default connect(mapStateToProps)(App);
