import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

// import PropTypes from 'prop-types';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    return (
      <div>
        <h1 data-testid="feedback-text">Feedback</h1>
        <Header />
        <h3
          data-testid="feedback-total-question"
        >
          { assertions }
        </h3>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);

// Requisito 11: Aline, Raphael, Carlos, Jéssica;
