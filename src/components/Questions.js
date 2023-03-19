import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions } from '../helpers/fetchHelpers';
import './Questions.css';
import { updateScore } from '../redux/actions';

class Questions extends Component {
  state = {
    arrayQuestions: [],
    answered: false,
    counter: 30,
    generatedAnswers: [],
  };

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const resolvedFetch = await fetchQuestions(token);

    this.setState({
      arrayQuestions: resolvedFetch.results,
    }, () => {
      const generatedAnswers = this.generateAnswers();
      this.setState({
        generatedAnswers,
      });
    });

    if (resolvedFetch.response_code) {
      const { history } = this.props;
      localStorage.removeItem('token');

      history.push('/');
    }
    const interval = 1000;
    this.timer = setInterval(this.counterHandler, interval);
  }

  generateAnswers = () => {
    const { arrayQuestions } = this.state;
    if (arrayQuestions.length > 0) {
      const currentCorrectAnswer = {
        question: arrayQuestions[0].correct_answer,
        correct: true,
        dataTestId: 'correct-answer',
        color: 'green',

      };

      const currentIncorrectAnswers = arrayQuestions[0].incorrect_answers
        .map((answer, index) => ({
          question: answer,
          correct: false,
          dataTestId: `wrong-answer-${index}`,
          color: 'red',
        }));

      const currentAnswers = [...currentIncorrectAnswers, currentCorrectAnswer];
      const number = 0.5;
      const curRandomAnswers = currentAnswers.sort(() => number - Math.random());
      return curRandomAnswers;
    }
  };

  onClickHandler = (event) => {
    const { value, dataset: { diff } } = event.target;
    const { counter } = this.state;
    const { dispatch } = this.props;

    clearInterval(this.timer);
    this.setState({
      answered: true,
    });
    if (value === 'true') {
      const diffObj = {
        easy: 1,
        medium: 2,
        hard: 3,
      };
      const pointValue = 10;
      const points = pointValue + (counter * diffObj[diff]);

      dispatch(updateScore(points));
    }
  };

  counterHandler = () => {
    this.setState((prevState) => ({
      counter: prevState.counter - 1,
    }));
  };

  render() {
    const { arrayQuestions, answered, counter, generatedAnswers } = this.state;

    if (counter === 0) {
      clearInterval(this.timer);
    }
    return (
      <div>
        {arrayQuestions.length > 0 && (
          <>
            <h1 data-testid="question-category">{ arrayQuestions[0].category }</h1>
            <h1 data-testid="question-text">{ arrayQuestions[0].question }</h1>
          </>
        )}
        <div><h2>{counter}</h2></div>
        <div data-testid="answer-options">
          {
            arrayQuestions.length > 0 && (
              generatedAnswers.map((answer) => (
                <button
                  className={ answered ? answer.color : '' }
                  key={ answer.question }
                  type="button"
                  data-testid={ answer.dataTestId }
                  value={ answer.correct }
                  data-diff={ arrayQuestions[0].difficulty }
                  onClick={ this.onClickHandler }
                  disabled={ counter === 0 || answered }
                >
                  {answer.question}

                </button>
              ))
            )
          }
        </div>
      </div>
    );
  }
}

Questions.defaultProps = {
  history: {},
};

Questions.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default connect()(Questions);

// Requisito 6: Aline, Raphael, Carlos, Jéssica, Luiz;
// Requisito 7: Aline, Raphael, Carlos, Jéssica, Luiz;
// Requisito 8: Aline, Raphael, Carlos, Jéssica, Luiz;
// Requisito 9: Raphael, Carlos;
