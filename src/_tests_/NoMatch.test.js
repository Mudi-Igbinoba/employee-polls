import React from 'react';
import { render } from '@testing-library/react';
import NoMatch from '../components/NoMatch';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../store';

describe('No Match', () => {
  it('will match snapshot', async () => {
    var view = render(
      <Provider store={store}>
        <MemoryRouter>
          <NoMatch />
        </MemoryRouter>
      </Provider>
    );
    expect(view).toMatchSnapshot();
  });
});
