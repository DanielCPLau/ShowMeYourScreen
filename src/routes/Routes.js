import React from 'react';
import { Route, IndexRedirect, Redirect } from 'react-router';
import Main from '../components/Main';
import Share from '../components/Share'
import Home from '../components/Home';

const Routes = (
  <Route path='/' component={Main}>
    <IndexRedirect to='/home' />
    <Route path='home' component={Home} />
    <Route path='share' component={Share} />
    <Redirect from='*' to='/' />
  </Route>
);

export default Routes;