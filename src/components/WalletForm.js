import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import { fetchApi, addExpenses, saveEdit } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: [],
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchApi());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  addExpensesButton = async () => {
    const { dispatch } = this.props;
    const { id, value, description, currency, method, tag } = this.state;
    console.log(this.state);
    const exchangeRates = await dispatch(fetchApi());
    const data = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    dispatch(addExpenses(data));
    this.setState({
      id: id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'alimentação',
    });
  };

  addEditButton = async () => {
    const { dispatch, editId, expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    console.log(this.state, 'here');
    const updatedExpenses = expenses.map((expense) => {
      if (expense.id === editId) {
        return {
          ...expense,
          description,
          tag,
          currency,
          value,
          method,
        };
      }
      return expense;
    });

    dispatch(saveEdit(updatedExpenses));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'alimentação',
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editing } = this.props;
    return (
      <form>
        <Table striped bordered hover variant="light">
          <label htmlFor="value">
            <th>#</th>
            <th>#</th>
            <td> Value:</td>
            <td>
              <input
                value={ value }
                type="number"
                name="value"
                data-testid="value-input"
                onChange={ this.handleChange }
              />

            </td>
          </label>

          <label htmlFor="description">
            <td> Description:</td>
            <td>
              {' '}
              <input
                value={ description }
                type="text"
                name="description"
                data-testid="description-input"
                onChange={ this.handleChange }
              />

            </td>
          </label>

          <label htmlFor="currency">
            <td> Currency:</td>
            <td>
              {' '}
              <select
                name="currency"
                value={ currency }
                data-testid="currency-input"
                onChange={ this.handleChange }
              >
                {currencies.map((a) => (<option value={ a } key={ a }>{a}</option>))}
              </select>

            </td>
          </label>

          <label htmlFor="method">
            <td>  Payment Method:</td>
            <td>
              {' '}
              <select
                value={ method }
                name="method"
                data-testid="method-input"
                onChange={ this.handleChange }
              >
                <option>Dinheiro</option>
                <option>Cartão de crédito</option>
                <option>Cartão de débito</option>
              </select>

            </td>

          </label>

          <label htmlFor="category">
            Category:
            <select
              name="tag"
              value={ tag }
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Transporte</option>
              <option>Saúde</option>
              <option>Trabalho</option>
            </select>
          </label>

          {
            editing ? (
              <Button
                type="button"
                name="edit"
                onClick={ this.addEditButton }
              >
                Editar despesa
              </Button>
            ) : (
              <Button
                name="add"
                type="button"
                onClick={ this.addExpensesButton }
              >
                Adicionar despesa
              </Button>
            )

          }
        </Table>
      </form>

    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editing: state.wallet.editing,
  expenses: state.wallet.expenses,
  editId: state.wallet.editId,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  editing: PropTypes.bool.isRequired,
  editId: PropTypes.number.isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
