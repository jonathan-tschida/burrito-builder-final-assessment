import React, { Component } from 'react';
import './Orders.css';
import { connect } from 'react-redux';
import { setOrders } from '../../actions';
import { getOrders } from '../../apiCalls';

class Orders extends Component {
  componentDidMount() {
    getOrders()
      .then(data => this.props.setOrders(data.orders))
      .catch(err => console.error('Error fetching:', err));
  }

  render() {
    const orderEls = this.props.orders.map((order, index) => {
      return (
        <div className="order" key={'order_' + index}>
          <h3>{order.name}</h3>
          <ul className="ingredient-list">
            {order.ingredients.map((ingredient, index) => {
              return <li key={'ingredient_' + index}>{ingredient}</li>
            })}
          </ul>
        </div>
      )
    });
    return (
      <section>
        { orderEls.length ? orderEls : <p>No orders yet!</p> }
      </section>
    )
  }

}

const mapStateToProps = ({ orders }) => ({
  orders
});

const mapDispatchToProps = (dispatch) => ({
  setOrders: (orders) => dispatch(setOrders(orders))
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);