import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Login from './Login';
import Dashboard from './Dashboard';
import { Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';
import Menu from './Menu';
import QuestionPage from './QuestionPage';
import NewQuestion from './NewQuestion';
import Leaderboard from './Leaderboard';
import NoMatch from './NoMatch';
import ProtectedRoute from './ProtectedRoute';

function App({ dispatch, loading }) {
  const [authedUser, setAuthedUser] = useState('');

  useEffect(() => {
    dispatch(handleInitialData(authedUser));
  }, [authedUser, dispatch]);

  return (
    <>
      <LoadingBar style={{ backgroundColor: 'blue', height: '5px' }} />
      <main className='bg-primary-subtle block min-vh-100'>
        <Routes>
          <Route
            path='/login'
            element={<Login user={authedUser} setUser={setAuthedUser} />}
          />

          {/* Protected routes */}
          <Route
            path='/'
            element={
              <ProtectedRoute authedUser={authedUser}>
                <Menu user={authedUser} setUser={setAuthedUser} />
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path='/add'
            element={
              <ProtectedRoute authedUser={authedUser}>
                <Menu user={authedUser} setUser={setAuthedUser} />
                <NewQuestion />
              </ProtectedRoute>
            }
          />
          <Route
            path='/leaderboard'
            element={
              <ProtectedRoute authedUser={authedUser}>
                <Menu user={authedUser} setUser={setAuthedUser} />
                <Leaderboard />
              </ProtectedRoute>
            }
          />
          <Route
            path='/question/:qid'
            element={
              <ProtectedRoute authedUser={authedUser}>
                <Menu user={authedUser} setUser={setAuthedUser} />
                <QuestionPage />
              </ProtectedRoute>
            }
          />

          <Route
            path='*'
            element={
              <ProtectedRoute authedUser={authedUser}>
                <Menu user={authedUser} setUser={setAuthedUser} />
                <NoMatch />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}

const mapStateToProps = ({ authedUser }) => ({
  loading: !authedUser
});

export default connect(mapStateToProps)(App);
