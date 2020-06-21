import React from 'react';
import { Router } from '@reach/router';
import Home from 'pages/Home/Home';
import ErrorPage from 'pages/ErrorPage/ErrorPage';
import Events from 'pages/Events/Events';

import './App.css';

function App() {
  return (
    <Router>
      <Home path="/" />
      <Events path="/events" />
      <ErrorPage default />
    </Router>
  );
}

export default App;
