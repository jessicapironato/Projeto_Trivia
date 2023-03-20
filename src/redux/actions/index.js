export const UPDATE_PERSONAL_INFO = 'UPDATE_PERSONAL_INFO';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const UPDATE_ASSERTIONS = 'UPDATE_ASSERTIONS';

const updatePersonalInfo = (info) => ({
  type: UPDATE_PERSONAL_INFO,
  payload: info,
});

const updateScore = (info) => ({
  type: UPDATE_SCORE,
  payload: info,
});

const updateAssertions = () => ({
  type: UPDATE_ASSERTIONS,
});

export { updatePersonalInfo, updateScore, updateAssertions };

// Requisito 9: Raphael, Carlos;
