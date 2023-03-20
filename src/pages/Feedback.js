import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    const minAssertion = 3;
    return (
      <div>
        <h1 data-testid="feedback-text">Feedback</h1>
        <Header />
        <h2
          data-testid="feedback-text"
        >
          {assertions >= minAssertion ? 'Well Done!' : 'Could be better...'}

        </h2>
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
// Requisito 13: Raphael e Carlos
