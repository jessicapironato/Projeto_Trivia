import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions } from '../helpers/fetchHelpers';

class Questions extends Component {
  async componentDidMount() {
    // const token = JSON.parse(localStorage.getItem('token'));
    const resolvedFetch = await fetchQuestions(token);

    if (resolvedFetch.response_code) {
      const { history } = this.props;
      localStorage.removeItem('token');

      history.push('/');
    }
  }

  render() {
    return (
      <div>
        <h1 data-testid="question-category">category</h1>
        <h1 data-testid="question-text">question</h1>
      </div>
    );
  }
}

Questions.defaultProps = {
  history: {},
};

Questions.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default connect()(Questions);
