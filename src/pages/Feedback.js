import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { resetScore } from '../redux/actions';
// import styles from '../styles/feedback.module.css';
import '../styles/Feedback.css';

class Feedback extends Component {
  handleClickPlayAgain = () => {
    const { history, dispatch } = this.props;
    history.push('/');
    dispatch(resetScore());
  };

  handleClickRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { assertions, score } = this.props;
    const minAssertion = 3;
    return (
      <div className="container-feedback-page">
        <Header />
        <div className="container-out-feedback">
          <div className="container-feedback">
            <h1>Feedback</h1>
            <h2
              data-testid="feedback-text"
            >
              {assertions >= minAssertion ? 'Well Done!' : 'Could be better...'}

            </h2>
            <div className="feedback-assertions-score">
              <h3 className="h3">
                Voce acertou
              </h3>
              <h3
                className="assertions"
                data-testid="feedback-total-question"
              >
                { assertions }
              </h3>
              <h3 className="h3">questões!</h3>
            </div>
            <div className="feedback-assertions-score">
              <h3 className="h3">Um total de</h3>
              <h3
                className="score"
                data-testid="feedback-total-score"
              >
                { score }
              </h3>

              <h3 className="h3">pontos</h3>
            </div>
          </div>
          <div className="btn-feedback">
            <button
              className="btn-play-again"
              type="button"
              data-testid="btn-play-again"
              onClick={ this.handleClickPlayAgain }
            >
              Play Again
            </button>
            <button
              className="btn-ranking"
              type="button"
              data-testid="btn-ranking"
              onClick={ this.handleClickRanking }
            >
              Ranking
            </button>
          </div>
        </div>
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
  dispatch: PropTypes.func.isRequired,
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
// Requisito 13: Raphael e Carlos
// Requisito 14/15/16/18: Aline e Jéssica;
// Requisito 19: Aline, Raphael, Carlos, Jéssica, Luiz;
