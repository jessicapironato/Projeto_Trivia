import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Feedback from '../pages/Feedback'
import { renderWithRouterAndRedux } from '../tests/helpers/renderWithRouterAndRedux'

describe('Testa a página Feedback', ()=>{
    const initialState = { player: {
        name: 'nome',
        assertions: 1,
        score: 70,
        gravatarEmail: 'test@test.com',
    }, }

    const route = '/feedback';

it('1. Testa a renderização da página', () =>{

    renderWithRouterAndRedux(<App />, initialState, route);

    const titleFeedback = screen.getByText(/Feedback/i);
    const gravatar = screen.getByTestId('header-profile-picture');
    const score = screen.getByTestId('header-score');
    const feedbackText = screen.getByTestId('feedback-text');
    const feedbackTotalScore = screen.getByTestId('feedback-total-score')
    const feedbackTotalQuestion = screen.getByTestId('feedback-total-question')
    const buttonPlay = screen.getByTestId('btn-play-again')
    const buttonRanking = screen.getByTestId('btn-ranking')
    


    expect(titleFeedback).toBeVisible();
    expect(gravatar).toBeVisible();
    expect(score).toBeVisible();
    expect(feedbackTotalScore.innerHTML).toEqual("70");
    expect(feedbackText).toBeVisible();
    expect(feedbackText).toHaveTextContent("Could be better...");
    expect(feedbackTotalScore).toBeVisible();
    expect(feedbackTotalQuestion).toBeVisible();
    expect(feedbackTotalQuestion).toHaveTextContent("1"); 
    expect(buttonPlay).toBeVisible();
    expect(buttonRanking).toBeVisible();
})

it('2. Testa se ao ter a pontuação maxima é renderizado Well done!', () => {

    const initialStateMax = { player: {
        name: 'nome',
        assertions: 4,
        score: 390,
        gravatarEmail: 'test@test.com',
    }, }

    renderWithRouterAndRedux(<App />, initialStateMax, route);

    const feedbackText = screen.getByTestId('feedback-text');
    expect(feedbackText).toHaveTextContent("Well Done!")

})

it('3. Testa se ao clicar em Play Again a pagina é redirecionada para /', () => {

   const { history } =  renderWithRouterAndRedux(<App />, initialState, route);
    
    const buttonPlay = screen.getByTestId('btn-play-again');

    userEvent.click(buttonPlay);

    expect(history.location.pathname).toBe('/');
})

it('4. Testa se ao clicar em Ranking a pagina é redirecionada para /ranking', () => {

    window.localStorage.setItem('ranking', JSON.stringify([{name: 'nome', email: 'test@test.com', score: 70}]))

    const { history } =  renderWithRouterAndRedux(<App />, initialState, route);
     
    const buttonRanking = screen.getByTestId('btn-ranking')
    userEvent.click(buttonRanking);
 
     expect(history.location.pathname).toBe('/ranking');
 })

})


