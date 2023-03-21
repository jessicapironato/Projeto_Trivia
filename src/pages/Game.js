import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Questions from '../components/Questions';
import styles from '../styles/game.module.css';

class Game extends Component {
  render() {
    const { history } = this.props;
    return (
      <div className={ styles.gameContainer }>

        <Header />
        <Questions history={ history } />
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Game;
