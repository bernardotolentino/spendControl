import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, editExpense } from '../redux/actions';
import Table from 'react-bootstrap/Table';


// terminado com a ajuda de victor monitor

class Table2 extends Component {
  handleDelete = ({ target }) => {
    const { id, name } = target;

    const idExp = parseInt(name, 7);

    const { dispatch } = this.props;

    if (id === 'delete') {
      console.log(id, name);
      dispatch(deleteExpense(idExp));
    } else {
      console.log(id, name);
      dispatch(editExpense(idExp));
    }
  };

  render() {
    const { expenses } = this.props;
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Descrição </th>
            <th>Tag </th>
            <th>Método de pagamento </th>
            <th>Valor </th>
            <th>Moeda </th>
            <th>Câmbio utilizado </th>
            <th>Valor convertido </th>
            <th>Moeda de conversão </th>
            <th>Editar/Excluir </th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((expense) => (
              <tr
                key={ expense.id }
              >
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ (+expense.value).toFixed(2) }</td>
                <td>{ expense.currency }</td>
                <td data-testId="convertValue">
                  {
                    (+expense.exchangeRates[expense.currency].ask).toFixed(2)
                  }
                </td>
                <td>
                  {
                    (+expense.value * expense.exchangeRates[expense.currency].ask)
                      .toFixed(2)
                  }
                </td>
                <td>{ expense.exchangeRates[expense.currency].name }</td>
                <td>
                  <button
                    type="button"
                    id="delete"
                    name={ expense.id }
                    data-testid="delete-btn"
                    onClick={ this.handleDelete }
                  >
                    Excluir
                  </button>
                  <button
                    type="button"
                    id="edit"
                    name={ expense.id }
                    data-testid="edit-btn"
                    onClick={ this.handleDelete }
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Table2);
