import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Menu from '../components/Menu';
import store from '../store';

describe('Menu', () => {
  it('will have all expected links', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Menu authedUser='zoshikanlu' setUser={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );
    var homeLink = screen.getByTestId('home-link');
    var leaderboardLink = screen.getByTestId('leaderboard-link');
    var addLink = screen.getByTestId('add-link');
    expect(homeLink).toBeInTheDocument();
    expect(leaderboardLink).toBeInTheDocument();
    expect(addLink).toBeInTheDocument();
  });
});
