import React from 'react';
import { Router } from '@reach/router';
import Home from 'pages/Home/Home';
import ErrorPage from 'pages/ErrorPage/ErrorPage';

import './App.css';

function App() {
  return (
    <Router>
      <Home path="/" />
      <ErrorPage default />
    </Router>
  );
}

export default App;
