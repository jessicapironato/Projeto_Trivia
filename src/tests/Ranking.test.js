import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from '../tests/helpers/renderWithRouterAndRedux'

describe('Testa componente Ranking', () => {
    const route = '/ranking'


  it('Tenta o redirecionamento para / após cliclar no botão', ()=>{

    window.localStorage.setItem('ranking', JSON.stringify([{name: 'nome', email: 'test@test.com', score: 70}]))

    const { history } =  renderWithRouterAndRedux(<App />, {}, route);

    const buttonGoHome = screen.getByTestId('btn-go-home')
       
    expect(buttonGoHome).toBeVisible();
    userEvent.click(buttonGoHome);

    expect(history.location.pathname).toBe('/');
  })
})