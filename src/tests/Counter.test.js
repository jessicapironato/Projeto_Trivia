import React from 'react';
import { screen, waitFor} from '@testing-library/react';
import {jest} from '@jest/globals'
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from '../tests/helpers/renderWithRouterAndRedux'

describe('Teste com counter', ()=> {

    const initialState = { player: {
      name: 'nome',
      assertions: 0,
      score: 0,
      gravatarEmail: 'test@test.com',
  }, }
  
    jest.setTimeout(39000);
    it('2.Testa se após o contador ser zerado, a pergunta consta como respondida ', async ()=> {
  
      const route = '/';
      renderWithRouterAndRedux(<App />, initialState, route);
  
      const inputName = screen.getByTestId('input-player-name');
      const inputEmail = screen.getByTestId('input-gravatar-email');
      const btnPlay = screen.getByTestId('btn-play');
      userEvent.type(inputName, 'name');
      userEvent.type(inputEmail, 'teste@teste.com');
      userEvent.click(btnPlay);
      
      await waitFor(() => {
        const counter = screen.getByTestId('question-counter');
        // console.log(counter.textContent)
        expect(counter.textContent).toBe("0")
      }, { timeout: 34000})
    })
  })
  