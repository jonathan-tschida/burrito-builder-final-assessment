import * as actions from '.';

describe('Action Creators', () => {
  it('should have a type of SET_ORDERS and a correct payload', () => {
    const orders = [
      {id: 1, name: 'Bob', ingredients: ['beans', 'steak']},
      {id: 2, name: 'Bill', ingredients: ['lettuce', 'sofritas']}
    ];
    const expectedResult = {
      type: 'SET_ORDERS',
      orders
    };
    const result = actions.setOrders(orders);
    expect(result).toEqual(expectedResult);
  });

  it('should have a type of ADD_ORDER and a correct payload', () => {
    const order = {id: 1, name: 'Bob', ingredients: ['beans', 'steak']};
    const expectedResult = {
      type: 'ADD_ORDER',
      order
    };
    const result = actions.addOrder(order);
    expect(result).toEqual(expectedResult);
  });

  it('should have a type of CANCEL_ORDER and a correct payload', () => {
    const id = 1;
    const expectedResult = {
      type: 'CANCEL_ORDER',
      id
    };
    const result = actions.cancelOrder(id);
    expect(result).toEqual(expectedResult);
  });
});
