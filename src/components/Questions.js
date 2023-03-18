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

  generateAnswers = () => {
    const { arrayQuestions } = this.state;
    if (arrayQuestions.length > 0) {
      const currentCorrectAnswer = {
        question: arrayQuestions[0].correct_answer,
        correct: true,
        dataTestId: 'correct-answer',

      };

      const currentIncorrectAnswers = arrayQuestions[0].incorrect_answers
        .map((answer, index) => ({
          question: answer,
          correct: false,
          dataTestId: `wrong-answer-${index}`,
        }));

      const currentAnswers = [...currentIncorrectAnswers, currentCorrectAnswer];
      const number = 0.5;
      const curRandomAnswers = currentAnswers.sort(() => number - Math.random());
      return curRandomAnswers;
    }
  };

  render() {
    const { arrayQuestions } = this.state;
    // console.log(arrayQuestions);

    const generatedAnswers = this.generateAnswers();
    console.log(generatedAnswers);

    return (
      <div>
        {arrayQuestions.length > 0 && (
          <>
            <h1 data-testid="question-category">{ arrayQuestions[0].category }</h1>
            <h1 data-testid="question-text">{ arrayQuestions[0].question }</h1>
          </>
        )}
        <div data-testid="answer-options">
          {
            arrayQuestions.length > 0 && (
              generatedAnswers.map((answer) => (
                <button
                  key={ answer.question }
                  data-testid={ answer.dataTestId }
                  value={ answer.correct }
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
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default connect()(Questions);

// Requisito 6: Aline, Raphael, Carlos, Jéssica, Luiz;
