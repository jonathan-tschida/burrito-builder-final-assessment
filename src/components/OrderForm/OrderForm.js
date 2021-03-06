import React, { Component } from 'react';
import './OrderForm.css';
import { connect } from 'react-redux';
import { addOrder } from '../../actions';
import { postOrder } from '../../apiCalls';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: []
    };
  }

  handleNameChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleIngredientChange = e => {
    const updatedIngredients = this.state.ingredients.includes(e.target.name) ?
      this.state.ingredients.filter(ingredient => ingredient !== e.target.name) :
      [...this.state.ingredients, e.target.name];
    e.preventDefault();
    this.setState({ingredients: updatedIngredients});
  }

  handleSubmit = e => {
    const { name, ingredients } = this.state;
    e.preventDefault();
    postOrder(name, ingredients)
      .then(order => {
        this.props.addOrder(order);
        this.clearInputs();
      })
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button
          key={ingredient}
          name={ingredient}
          className={this.state.ingredients.includes(ingredient) ? 'selected' : ''}
          onClick={e => this.handleIngredientChange(e)}
        >
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button onClick={e => this.handleSubmit(e)} disabled={!this.state.ingredients.length || !this.state.name.length}>
          Submit Order
        </button>
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  addOrder: (order) => dispatch(addOrder(order))
});

export default connect(null, mapDispatchToProps)(OrderForm);
