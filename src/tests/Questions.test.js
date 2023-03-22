import React from 'react';
import { screen} from '@testing-library/react';
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

afterEach(() => {
  jest.restoreAllMocks()
  jest.useRealTimers()
})

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

  it('2.Testa se adiciona um novo jogador ao LocalStorage', async () => {
    window.localStorage.setItem('ranking', JSON.stringify([{name: 'nome1', email: 'test1@test.com', score: 80}]));
    const { history } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');
    userEvent.type(inputName, 'name');
    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.click(btnPlay);

    for (let i = 0; i < 5; i++) {
      if (i === 1) {
        const incorrectAnswer = await screen.findByTestId('wrong-answer-0', {}, { timeout: 5000 });
        expect(incorrectAnswer).toBeVisible();
        userEvent.click(incorrectAnswer);
      }
        const correctAnswer = await screen.findByTestId('correct-answer', {}, { timeout: 5000 });
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

  it('3. Testa se o token for inválido, retorna para a página de Login', async () => {
    const mockData = {
      "response_code":3,
      "results":[]
    }

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });


    const route = '/game';
    const {history} = renderWithRouterAndRedux(<App />, initialState, route);

    const nameInput = await screen.findByTestId('input-player-name', {}, { timeout: 5000 });
    expect(nameInput).toBeVisible();
    const { pathname } = history.location;
    expect(pathname).toBe('/');

  })
})
