// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import FilmList from './components/FilmList';
import PurchaseHistory from './components/PurchaseHistory';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background: #f8f9fa;
  }
  * {
    box-sizing: border-box;
  }
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/films" component={FilmList} />
        <Route path="/purchases" component={PurchaseHistory} />
      </Switch>
    </Router>
  );
}

export default App;
