import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fecthToken } from '../helpers/fetchHelpers';
import { updatePersonalInfo } from '../redux/actions';
import '../styles/Login.css';

class Login extends Component {
  state = {
    name: '',
    email: '',
    buttonLogin: true,
  };

  onClickHandler = async () => {
    const { history, dispatch } = this.props;
    dispatch(updatePersonalInfo(this.state));
    const token = await fecthToken();
    history.push('/game');
    localStorage.setItem('token', token);
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, this.formValidation);
  };

  onClickSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  formValidation = () => {
    const { email, name } = this.state;

    const emailValidation = email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i);
    const nameValidation = name.length > 0;

    this.setState({
      buttonLogin: !(emailValidation && nameValidation),
    });
  };

  render() {
    const { name, email, buttonLogin } = this.state;
    return (
      <div className="container-login">
        <div className="container-form-login">
          <h1>Trivia</h1>
          <div className="inputs-login">
            <input
              type="text"
              name="name"
              value={ name }
              onChange={ this.handleChange }
              placeholder="Nome"
              data-testid="input-player-name"
            />
            <input
              type="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              placeholder="Email"
              data-testid="input-gravatar-email"
            />
          </div>
          <div className="buttons-login">
            <button
              className="button-login"
              type="button"
              data-testid="btn-play"
              disabled={ buttonLogin }
              onClick={ this.onClickHandler }
            >
              Play
            </button>

            <button
              className="button-login"
              data-testid="btn-settings"
              onClick={ this.onClickSettings }
            >
              Settings
            </button>
          </div>
        </div>

      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);

// Requisito 1: Aline, Raphael, Carlos, Jéssica, Luiz;
// Requisito 2: Raphael e Luiz;
// Requisito 5: Raphael e Luiz;
// Requisito 6: Aline, Raphael, Carlos, Jéssica, Luiz;
