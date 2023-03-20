import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetScore } from '../redux/actions';

class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));

    this.setState({
      ranking,
    });
  }

  handleClickGoHome = () => {
    const { history, dispatch } = this.props;
    history.push('/');
    dispatch(resetScore());
  };

  render() {
    const { ranking } = this.state;
    return (
      <>
        <div
          data-testid="ranking-title"
        >
          Ranking
        </div>
        <ul>
          {
            ranking.map((player, index) => (
              <li key={ player.email }>
                <img src={ `https://www.gravatar.com/avatar/${md5(player.email).toString()}` } alt={ player.name } />
                <p data-testid={ `player-name-${index}` }>{player.name}</p>
                <p data-testid={ `player-score-${index}` }>{player.score}</p>
              </li>
            ))
          }
        </ul>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleClickGoHome }
        >
          Login
        </button>
      </>
    );
  }
}

Ranking.defaultProps = {
  history: {},
};

Ranking.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
export default connect()(Ranking);

// Requisito 14/15/16/18: Aline e Jéssica;
// Requisito 19: Aline, Raphael, Carlos, Jéssica, Luiz;
