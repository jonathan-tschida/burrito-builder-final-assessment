import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';
import { getOrders, postOrder } from '../../apiCalls.js';
jest.mock('../../apiCalls.js');

const renderApp = () => {
  const testStore = createStore(rootReducer);
  return render(
    <Provider store={testStore}>
      <App />
    </Provider>
  )
}

describe('App', () => {
  it('renders correctly', () => {
    getOrders.mockResolvedValueOnce({orders: []});
    const { getByText } = renderApp();

    expect(getByText('Burrito Builder')).toBeInTheDocument();
    expect(getByText('Submit Order')).toBeInTheDocument();
    expect(getByText('No orders yet!')).toBeInTheDocument();
  });

  it('displays orders from fetched data', async () => {
    getOrders.mockResolvedValueOnce({
      orders: [
        {id: 1, name: 'Bob', ingredients: ['beans', 'steak']},
        {id: 2, name: 'Bill', ingredients: ['lettuce', 'sofritas']}
      ]
    })
    const { getByText, getAllByText } = renderApp();

    await waitFor(() => getByText('Bob'));

    expect(getByText('Bob')).toBeInTheDocument();
    expect(getByText('Bill')).toBeInTheDocument();
    expect(getAllByText('beans')[1]).toBeInTheDocument();
    expect(getAllByText('steak')[1]).toBeInTheDocument();
    expect(getAllByText('lettuce')[1]).toBeInTheDocument();
    expect(getAllByText('sofritas')[1]).toBeInTheDocument();
  });

  it('renders a new order after submitting', async () => {
    getOrders.mockResolvedValueOnce({orders: []});
    postOrder.mockResolvedValueOnce({id: 1, name: 'Bob', ingredients: ['beans']});
    const { getByText, getAllByText, getByPlaceholderText } = renderApp();

    fireEvent.change(getByPlaceholderText('Name'), { target: { value: 'Bob' } });
    fireEvent.click(getByText('beans'));
    fireEvent.click(getByText('Submit Order'));

    await waitFor(() => getByText('Bob'));
    expect(getAllByText('beans')[1]).toBeInTheDocument();
  });
});
