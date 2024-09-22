import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import NewQuestion from '../components/NewQuestion';
import store from '../store';

describe('New Question', () => {
  it('will have the expected fields', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NewQuestion />
        </MemoryRouter>
      </Provider>
    );
    var optionOneInput = screen.getByTestId('option-one-input');
    var optionTwoInput = screen.getByTestId('option-two-input');
    var submitButton = screen.getByTestId('submit-options-button');
    expect(optionOneInput).toBeInTheDocument();
    expect(optionTwoInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('will have a disabled button until fields are filled', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NewQuestion />
        </MemoryRouter>
      </Provider>
    );
    var optionOneInput = screen.getByTestId('option-one-input');
    var optionTwoInput = screen.getByTestId('option-two-input');
    var submitButton = screen.getByTestId('submit-options-button');

    expect(submitButton).toHaveAttribute('disabled');

    fireEvent.change(optionOneInput, { target: { value: 'Have a dog!' } });
    fireEvent.change(optionTwoInput, { target: { value: 'Have a cat' } });

    expect(submitButton).not.toHaveAttribute('disabled');
  });
});
