import React, { Component } from 'react';
// import PropTypes from 'prop-types';

class Login extends Component {
  state = {
    name: '',
    email: '',
    buttonLogin: true,
  };

  onClickHandler = () => {
    console.log('clicked');
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, this.formValidation);
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
      <div>
        <h1>Login Page</h1>
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
          placeholder="email"
          data-testid="input-gravatar-email"
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ buttonLogin }
          onClick={ this.onClickHandler }
        >
          Play
        </button>
      </div>
    );
  }
}

// Login.propTypes = {

// };

export default Login;

// Requisito 1: Aline, Raphael, Carlos, Jéssica, Luiz;
