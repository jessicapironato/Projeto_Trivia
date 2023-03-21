import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import {jest} from '@jest/globals'
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from '../tests/helpers/renderWithRouterAndRedux'

describe('Testa componente Questions', () => {
  const initialState = { player: {
    name: 'nome',
    assertions: 0,
    score: 0,
    gravatarEmail: 'test@test.com',
}, }

function timerGame(callback) {
  console.log('Ready....go!');
  setTimeout(() => {
    console.log("Time's up -- stop!");
    callback && callback();
  }, 1000);
}

  it('1.Testa renderização', async ()=> {

    const { history } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');
    userEvent.type(inputName, 'name');
    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.click(btnPlay);

    for (let i = 0; i < 5; i++) {
        const correctAnswer = await screen.findByTestId('correct-answer', {}, { timeout: 4000 });
        expect(correctAnswer).toBeVisible();
        userEvent.click(correctAnswer);
        expect(correctAnswer).toBeDisabled();
        const btnNext = screen.getByTestId('btn-next');
        expect(btnNext).toBeVisible();
        userEvent.click(btnNext);
        expect(btnNext).not.toBeVisible();
    }

    const { pathname } = history.location;
    expect(pathname).toBe('/feedback');

  })

  it.skip('2.Testa se após o contador ser zerado, a pergunta consta como respondida ', async ()=> {
    
    jest.useFakeTimers();
    const route = '/game';
    renderWithRouterAndRedux(<App />, initialState, route);
    const callback = jest.fn();
    
    timerGame(callback);

    jest.advanceTimersByTime(32000);

    const correctAnswer = screen.getByTestId('correct-answer');
    expect(correctAnswer).toBeDisabled()
  
  })

  it('3.Testa se adiciona um novo jogador ao LocalStorage', async () => {
    window.localStorage.setItem('ranking', JSON.stringify([{name: 'nome1', email: 'test1@test.com', score: 80}]));
    const { history } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');
    userEvent.type(inputName, 'name');
    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.click(btnPlay);

    for (let i = 0; i < 5; i++) {
        const correctAnswer = await screen.findByTestId('correct-answer', {}, { timeout: 4000 });
        expect(correctAnswer).toBeVisible();
        userEvent.click(correctAnswer);
        expect(correctAnswer).toBeDisabled();
        const btnNext = screen.getByTestId('btn-next');
        expect(btnNext).toBeVisible();
        userEvent.click(btnNext);
        expect(btnNext).not.toBeVisible();
    }

    const { pathname } = history.location;
    expect(pathname).toBe('/feedback');
});


  test('4. Testa se ', () => {

  })
})