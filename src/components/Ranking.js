import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  handleClickGoHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <>
        <div
          data-testid="ranking-title"
        >
          Ranking
        </div>

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
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
export default Ranking;
