import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import './App.css';

function App() {
  return (
    <div id="header">
      <h1>Spend Contol</h1>
      <BrowserRouter>
        <Switch>
          <Route>
            <Route exact path="/" component={ Login } />
            <Route path="/carteira" component={ Wallet } />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>

  );
}
export default App;
