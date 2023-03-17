import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { name, email } = this.props;
    const gravatarSrc = `https://www.gravatar.com/avatar/${md5(email).toString()}`;
    return (
      <div>
        <h1>Header</h1>
        <img
          src={ gravatarSrc }
          alt={ md5(email).toString() }
          data-testid="header-profile-picture"
        />
        <h3 data-testid="header-player-name">{name}</h3>
        <h3 data-testid="header-score">0</h3>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Header);

// Requisito 5: Raphael e Luiz;
