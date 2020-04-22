import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import OrderForm from './OrderForm';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';
import { postOrder } from '../../apiCalls.js';
jest.mock('../../apiCalls.js');

const renderOrderForm = () => {
  const testStore = createStore(rootReducer);
  return render(
    <Provider store={testStore}>
      <OrderForm />
    </Provider>
  )
}

describe('OrderForm', () => {
  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = renderOrderForm();
    const ingredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];

    expect(getByPlaceholderText('Name')).toBeInTheDocument();
    ingredients.forEach(ingredient => {
      expect(getByText(ingredient)).toBeInTheDocument();
    });
    expect(getByText('Order: Nothing selected')).toBeInTheDocument();
    expect(getByText('Submit Order')).toBeInTheDocument();
  });

  it('updates the Order when ingredient buttons are clicked', () => {
    const { getByText } = renderOrderForm();

    fireEvent.click(getByText('beans'));
    expect(getByText('Order: beans')).toBeInTheDocument();

    fireEvent.click(getByText('steak'));
    expect(getByText('Order: beans, steak')).toBeInTheDocument();
  });

  it('clears the order on submit', async () => {
    postOrder.mockResolvedValueOnce({});
    const { getByText } = renderOrderForm();

    fireEvent.click(getByText('beans'));
    fireEvent.click(getByText('steak'));
    expect(getByText('Order: beans, steak')).toBeInTheDocument();

    fireEvent.click(getByText('Submit Order'));
    await waitFor(() => expect(getByText('Order: Nothing selected')).toBeInTheDocument());
  });
});
