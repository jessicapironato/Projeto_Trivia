import { UPDATE_PERSONAL_INFO, UPDATE_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '', // nome-da-pessoa,
  assertions: 0, // número-de-acertos,
  score: 0, // pontuação,
  gravatarEmail: '', // email-da-pessoa,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_PERSONAL_INFO: {
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  }
  case UPDATE_SCORE: {
    return {
      ...state,
      score: state.score + action.payload,
    };
  }
  default:
    return {
      ...state,
    };
  }
};

export default player;

// Requisito 9: Raphael, Carlos;
