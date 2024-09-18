import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../components/App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import reducer from '../reducers';
import middleware from '../middleware';

test('renders learn react link', () => {
  const store = createStore(reducer, middleware);

  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  screen.debug();
});
