import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { name, email, score } = this.props;
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
        <h3 data-testid="header-score">{score}</h3>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);

// Requisito 5: Raphael e Luiz;
// Requisito 9: Raphael, Carlos;
// Requisito 12: Aline, Raphael, Carlos e Jéssica;
