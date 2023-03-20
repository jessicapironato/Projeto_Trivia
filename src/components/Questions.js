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
    positionQuestion: 0,
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

  componentDidUpdate() {
    const { counter, answered } = this.state;
    if (counter === 0 && answered === false) {
      this.setState({
        answered: true,
      });
    }
  }

  generateAnswers = () => {
    const { arrayQuestions, positionQuestion } = this.state;
    if (arrayQuestions.length > 0) {
      const currentCorrectAnswer = {
        question: arrayQuestions[positionQuestion].correct_answer,
        correct: true,
        dataTestId: 'correct-answer',
        color: 'green',

      };

      const currentIncorrectAnswers = arrayQuestions[positionQuestion].incorrect_answers
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

  handleClickNext = () => {
    const { history } = this.props;
    const { positionQuestion } = this.state;
    const maxQuestion = 4;

    if (positionQuestion === maxQuestion) {
      history.push('/feedback');
    }
    this.setState((prevState) => ({
      answered: false,
      positionQuestion: prevState.positionQuestion + 1,
      counter: 30,
    }), () => {
      const generatedAnswers = this.generateAnswers();
      this.setState({
        generatedAnswers,
      });
    });

    const interval = 1000;
    this.timer = setInterval(this.counterHandler, interval);
  };

  render() {
    const { arrayQuestions,
      answered,
      counter,
      generatedAnswers,
      positionQuestion } = this.state;

    if (counter === 0) {
      clearInterval(this.timer);
    }
    return (
      <div>
        {arrayQuestions.length > 0 && (
          <>
            <h1 data-testid="question-category">
              { arrayQuestions[positionQuestion]
                .category }

            </h1>
            <h1 data-testid="question-text">
              { arrayQuestions[positionQuestion]
                .question }

            </h1>
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
                  data-diff={ arrayQuestions[positionQuestion].difficulty }
                  onClick={ this.onClickHandler }
                  disabled={ counter === 0 || answered }
                >
                  {answer.question}

                </button>
              ))
            )
          }
        </div>
        {answered && (
          <button
            data-testid="btn-next"
            type="button"
            onClick={ this.handleClickNext }
          >

            Next
          </button>)}
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

// Requisito 6: Aline, Raphael, Carlos, Jéssica, Luiz; Dependendo da "sorte" na aleatóriedade, requisito pode falhar nos testes;
// Requisito 7: Aline, Raphael, Carlos, Jéssica, Luiz;
// Requisito 8: Aline, Raphael, Carlos, Jéssica, Luiz;
// Requisito 9: Raphael, Carlos;
// Requisito 10: Aline e Jéssica; Requisito 7 falhando no cypress, verificar o link:
// https://trybecourse.slack.com/archives/C03BTD3G9V3/p1662752927964429?thread_ts=1662752871.237939&cid=C03BTD3G9V3
// Requisito 11: Aline, Raphael, Carlos, Jéssica;
// Requisito 14/15/16/18: Aline e Jéssica;
