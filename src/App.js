import React from 'react';
import { browserHistory, Router } from 'react-router';
import Routes from './routes/Routes';

const App = () => (
  <Router
    history={browserHistory} routes={Routes}
  />
);

export default App;