import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        {/* <Route path="/game" component={ <Game /> } />
        <Route path="/feedback" component={ <Feedback /> } /> */}
      </Switch>

    </div>
  );
}

export default connect(null)(App);

// Lembrar de atualizar paths caso seja necessário
