import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  handleClickPlayAgain = () => {
    const { history } = this.props;
    history.push('/');
    // dispatch();
  };

  handleClickRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { assertions, score } = this.props;
    return (
      <div>
        <h1 data-testid="feedback-text">Feedback</h1>
        <Header />
        <h3
          data-testid="feedback-total-score"
        >
          { score }
        </h3>
        <h3
          data-testid="feedback-total-question"
        >
          { assertions }
        </h3>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleClickPlayAgain }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.handleClickRanking }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.defaultProps = {
  history: {},
};
Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  // dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);

// Requisito 11: Aline, Raphael, Carlos, Jéssica;
