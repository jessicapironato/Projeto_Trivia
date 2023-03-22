import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetScore } from '../redux/actions';
import '../styles/Ranking.css';
import star from '../images/star.png';

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
      <div className="container-ranking">
        <div className="container-inside-ranking">
          <h1
            data-testid="ranking-title"
          >
            Ranking
          </h1>
          <ul>
            {
              ranking.map((player, index) => (
                <li key={ player.email }>
                  <div className="name-img-ranking">
                    <img src={ `https://www.gravatar.com/avatar/${md5(player.email).toString()}` } alt={ player.name } />
                    <p
                      className="name-ranking"
                      data-testid={ `player-name-${index}` }
                    >
                      {player.name}

                    </p>
                  </div>
                  <div className="score-ranking">
                    <img className="img-star" src={ star } alt="star" />
                    <p
                      className="score-number"
                      data-testid={ `player-score-${index}` }
                    >
                      {player.score}

                    </p>
                  </div>
                </li>
              ))
            }
          </ul>
          <button
            className="btn-login-ranking"
            type="button"
            data-testid="btn-go-home"
            onClick={ this.handleClickGoHome }
          >
            Login
          </button>
        </div>
      </div>
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
