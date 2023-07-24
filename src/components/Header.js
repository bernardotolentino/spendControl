import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const expSum = expenses
      .reduce((vA, eA) => vA + eA.value * eA.exchangeRates[eA.currency].ask, 0);
    return (
      <header>
        <div>
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">{ expSum.toFixed(2) }</p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Header);
