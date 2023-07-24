import React from 'react';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { loadEmail } from '../redux/actions';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

class Login extends React.Component {
  constructor() {
    super();

    this.validationBtn = this.validationBtn.bind(this);
    this.loginButton = this.loginButton.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validationBtn());
  }

  loginButton() {
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(loadEmail(email));
    history.push('/carteira');
  }

  validationBtn() {
    const { email, password } = this.state;
    const validation = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const passLength = 6;
    if (password.length >= passLength
      && RegExp(validation).test(email)) {
      this.setState({
        disabled: false,
      });
    } else {
      console.log('digite um email');
      this.setState({
        disabled: true,
      });
    }
  }

  render() {
    const { email, password, disabled } = this.state;
    return (
      <div id="log">
        <Card>
          <form className="login">

            <label htmlFor="input-email">
              LOGIN:
              <input
                type="text"
                name="email"
                id="email"
                value={ email }
                data-testid="email-input"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="input-password">
              SENHA:
              <input
                type="password"
                name="password"
                id="senha"
                value={ password }
                data-testid="password-input"
                onChange={ this.handleChange }
              />
            </label>

            <Button
              id="entrar"
              type="button"
              data-testid="entrar"
              onClick={ this.loginButton }
              disabled={ disabled }
            >
              Entrar

            </Button>
          </form>
        </Card>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
