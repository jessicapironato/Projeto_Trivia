import { UPDATE_PERSONAL_INFO } from '../actions';

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
  default:
    return {
      ...state,
    };
  }
};

export default player;
