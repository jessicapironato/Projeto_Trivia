export const UPDATE_PERSONAL_INFO = 'UPDATE_PERSONAL_INFO';

const updatePersonalInfo = (info) => ({
  type: UPDATE_PERSONAL_INFO,
  payload: info,
});

export { updatePersonalInfo };
