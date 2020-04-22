import { orders } from './orders';

describe('Orders Reducer', () => {
  it('should set the orders to a given array when receiving SET_ORDERS', () => {
    const testOrders = [
      {id: 1, name: 'Bob', ingredients: ['beans', 'steak']},
      {id: 2, name: 'Bill', ingredients: ['lettuce', 'sofritas']}
    ];
    const action = {
      type: 'SET_ORDERS',
      orders: testOrders
    };
    const expectedResult = testOrders;
    const result = orders([], action);
    expect(result).toEqual(expectedResult);
  });

  it('should add an order to state when receiving ADD_ORDER', () => {
    const previousState = [
      {id: 1, name: 'Bob', ingredients: ['beans', 'steak']}
    ];
    const newOrder = {id: 2, name: 'Bill', ingredients: ['lettuce', 'sofritas']}
    const action = {
      type: 'ADD_ORDER',
      order: newOrder
    };
    const expectedResult = [
      {id: 1, name: 'Bob', ingredients: ['beans', 'steak']},
      {id: 2, name: 'Bill', ingredients: ['lettuce', 'sofritas']}
    ];
    const result = orders(previousState, action);
    expect(result).toEqual(expectedResult);
  });

  it('should remove an order from state when receiving CANCEL_ORDER', () => {
    const previousState = [
      {id: 1, name: 'Bob', ingredients: ['beans', 'steak']},
      {id: 2, name: 'Bill', ingredients: ['lettuce', 'sofritas']}
    ];
    const action = {
      type: 'CANCEL_ORDER',
      id: 2
    };
    const expectedResult = [
      {id: 1, name: 'Bob', ingredients: ['beans', 'steak']}
    ];
    const result = orders(previousState, action);
    expect(result).toEqual(expectedResult);
  });
});
