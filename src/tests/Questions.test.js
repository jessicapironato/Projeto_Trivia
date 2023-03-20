import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from '../tests/helpers/renderWithRouterAndRedux'

describe('Testa componente Questions', () => {
//   const initialState = { player: {
//     name: 'nome',
//     assertions: 0,
//     score: 0,
//     gravatarEmail: 'test@test.com',
// }, }


  it('1.Testa renderização', async ()=> {
    const { history } = renderWithRouterAndRedux(<App />);
    
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');

    userEvent.type(inputName, 'name')
    userEvent.type(inputEmail, 'teste@teste.com')
    userEvent.click(btnPlay);

    const correctAnswer = await screen.findByTestId('correct-answer', {}, {timeout: 4000});
    expect(correctAnswer).toBeVisible();

    userEvent.click(correctAnswer);
    expect(correctAnswer).toBeDisabled();

    const btnNext = screen.getByTestId('btn-next');
    expect(btnNext).toBeVisible();
    userEvent.click(btnNext);
//
    expect(btnNext).not.toBeVisible();

    const correctAnswer2 = await screen.findByTestId('correct-answer', {}, {timeout: 4000});
    userEvent.click(correctAnswer2);
    expect(correctAnswer2).toBeDisabled();

    const btnNext2 = screen.getByTestId('btn-next');
    expect(btnNext2).toBeVisible();
    userEvent.click(btnNext2);
//

    expect(btnNext2).not.toBeVisible();

    const correctAnswer3 = await screen.findByTestId('correct-answer', {}, {timeout: 4000});
    userEvent.click(correctAnswer3);
    expect(correctAnswer3).toBeDisabled();

    const btnNext3 = screen.getByTestId('btn-next');
    expect(btnNext3).toBeVisible();
    userEvent.click(btnNext3)

    //

    expect(btnNext3).not.toBeVisible();

    const correctAnswer4 = await screen.findByTestId('correct-answer', {}, {timeout: 4000});
    userEvent.click(correctAnswer4);
    expect(correctAnswer4).toBeDisabled();

    const btnNext4 = screen.getByTestId('btn-next');
    expect(btnNext4).toBeVisible();
    userEvent.click(btnNext4)

    //

    expect(btnNext4).not.toBeVisible();

    const correctAnswer5 = await screen.findByTestId('correct-answer', {}, {timeout: 4000});
    userEvent.click(correctAnswer5);
    expect(correctAnswer5).toBeDisabled();

    const btnNext5 = screen.getByTestId('btn-next');
    expect(btnNext5).toBeVisible();
    userEvent.click(btnNext5)

    const { pathname } = history.location;
    expect(pathname).toBe('/feedback');

  })

  it('2.', ()=> {
    
  })

  // it('3.', ()=> {
    
  // })
})