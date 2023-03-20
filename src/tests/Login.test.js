import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from '../tests/helpers/renderWithRouterAndRedux'

describe('Testa a página de Login',() =>{

it('1.Testa se as informações são renderizadas', ()=>{
    renderWithRouterAndRedux(<App />);

    const title = screen.getByRole('heading', {name: 'Login Page', level:1 });
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');
    const btnSettings = screen.getByTestId('btn-settings');
    
    expect(title).toBeVisible();
    expect(inputName).toBeVisible();
    expect(inputEmail).toBeVisible();
    expect(btnPlay).toBeVisible();
    expect(btnSettings).toBeVisible();
})

it('2.Testa se o botão é habilitado após preenchimento de nome e e-mail', async () => {
  const { history } = renderWithRouterAndRedux(<App />);

  const inputName = screen.getByTestId('input-player-name');
  const inputEmail = screen.getByTestId('input-gravatar-email');
  const btnPlay = screen.getByTestId('btn-play');

  expect(btnPlay).toHaveAttribute('disabled');

  userEvent.type(inputName, 'name')
  userEvent.type(inputEmail, 'teste@teste.com')

  expect(btnPlay).not.toHaveAttribute('disabled');

  userEvent.click(btnPlay);

  await screen.findByTestId('correct-answer', {}, {timeout: 5000})
  
  const { pathname } = history.location;
  expect(pathname).toBe('/game');

})

it('3.Testa se ao clicar em setting a rota é direcionada para /settings', ()=>{
  const { history } = renderWithRouterAndRedux(<App />);

  const btnSettings = screen.getByTestId('btn-settings');
  userEvent.click(btnSettings);

//   const { pathname } = history.location;
  expect(history.location.pathname).toBe('/settings')
})

})

// Requisito 4: Aline e Jéssica