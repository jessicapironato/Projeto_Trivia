export const UPDATE_PERSONAL_INFO = 'UPDATE_PERSONAL_INFO';
export const UPDATE_SCORE = 'UPDATE_SCORE';

const updatePersonalInfo = (info) => ({
  type: UPDATE_PERSONAL_INFO,
  payload: info,
});

const updateScore = (info) => ({
  type: UPDATE_SCORE,
  payload: info,
});

export { updatePersonalInfo, updateScore };

// Requisito 9: Raphael, Carlos;
