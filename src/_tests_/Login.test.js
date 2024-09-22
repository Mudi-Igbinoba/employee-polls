import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Login from '../components/Login';
import store from '../store';

describe('Login', () => {
  it('will select a user', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login user='' setUser={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );
    var userSelect = screen.getByTestId('user-option');
    fireEvent.change(userSelect, { target: { value: 'zoshikanlu' } });
    expect(userSelect).toBeInTheDocument();

    var userFeedback = screen.getByTestId('user-success');
    expect(userFeedback).toBeInTheDocument();
  });
});
