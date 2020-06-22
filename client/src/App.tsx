import React from 'react';
import { Router } from '@reach/router';
import Login from 'pages/Login/Login';
import ErrorPage from 'pages/ErrorPage/ErrorPage';
import Events from 'pages/Events/Events';
import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';

import './App.css';

function App() {
  return (
    <Router>
      <ProtectedRoute path="/" as={Events}></ProtectedRoute>
      <Login path="/login" />
      <ErrorPage default />
    </Router>
  );
}

export default App;
