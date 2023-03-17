import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions } from '../helpers/fetchHelpers';

class Questions extends Component {
  state = {
    arrayQuestions: [],
  };

  async componentDidMount() {
    const token = JSON.parse(localStorage.getItem('token'));
    const resolvedFetch = await fetchQuestions(token);

    this.setState({
      arrayQuestions: resolvedFetch.results,
    });

    if (resolvedFetch.response_code) {
      const { history } = this.props;
      localStorage.removeItem('token');

      history.push('/');
    }
  }

  render() {
    const { arrayQuestions } = this.state;
    console.log(arrayQuestions);

    return (
      <div>
        {arrayQuestions.length > 0 && (
          <>
            <h1 data-testid="question-category">{ arrayQuestions[0].category }</h1>
            <h1 data-testid="question-text">{ arrayQuestions[0].question }</h1>
          </>
        )}

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
