import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions } from '../helpers/fetchHelpers';
import { updateScore, updateAssertions } from '../redux/actions';
import '../styles/Game.css';
import timer from '../images/timer.png';

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
      dispatch(updateAssertions());
    }
  };

  counterHandler = () => {
    this.setState((prevState) => ({
      counter: prevState.counter - 1,
    }));
  };

  handleClickNext = () => {
    const { history, name, email, score } = this.props;
    const { positionQuestion } = this.state;
    const maxQuestion = 4;

    if (positionQuestion === maxQuestion) {
      history.push('/feedback');

      // const ranking = JSON.parse(localStorage.getItem('ranking'));
      // console.log(ranking);

      if (!localStorage.getItem('ranking')) {
        const newPlayer = {
          name,
          email,
          score,
        };

        localStorage.setItem('ranking', JSON.stringify([newPlayer]));
      } else {
        const updatedRanking = JSON.parse(localStorage.getItem('ranking'));

        const newPlayer = {
          name,
          email,
          score,
        };

        const newUpdatedRanking = [...updatedRanking, newPlayer];
        const sortedRanking = newUpdatedRanking.sort((a, b) => b.score - a.score);

        localStorage.setItem('ranking', JSON.stringify(sortedRanking));
      }
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
      <div className="container-questions">
        <div className="container-category-timer">
          {arrayQuestions.length > 0 && (
            <>
              <h1 className="question-category" data-testid="question-category">
                { arrayQuestions[positionQuestion]
                  .category }

              </h1>
              <h1 className="question-text" data-testid="question-text">
                { arrayQuestions[positionQuestion]
                  .question }

              </h1>
            </>
          )}
          <div className="container-timer">
            <img className="img-timer" src={ timer } alt="timer" />
            <h2 className="counter" data-testid="question-counter">{counter}</h2>
          </div>
        </div>
        <div className="container-options">
          <div className="answer-options" data-testid="answer-options">
            {
              arrayQuestions.length > 0 && (
                generatedAnswers.map((answer) => (
                  <button
                    className={ answered ? answer.color : 'normal' }
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
              className="button-next"
              data-testid="btn-next"
              type="button"
              onClick={ this.handleClickNext }
            >

              Next
            </button>)}
        </div>
      </div>
    );
  }
}

Questions.defaultProps = {
  history: {},
};

Questions.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps)(Questions);
// Requisito 6, 19: Aline, Raphael, Carlos, Jéssica, Luiz; Dependendo da "sorte" na aleatóriedade, requisito pode falhar nos testes;
// Requisito 7, 19, 11, 8: Aline, Raphael, Carlos, Jéssica, Luiz;
// Requisito 9, 13: Raphael, Carlos;
// Requisito 10, 14, 15, 16, 18: Aline e Jéssica; Requisito 7 falhando no cypress, verificar no slack
