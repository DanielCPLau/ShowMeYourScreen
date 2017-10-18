import React from 'react';
import { Route, IndexRedirect, Redirect } from 'react-router';
import Main from '../components/Main';
import Share from '../components/Share'
import Home from '../components/Home';
import Join from '../components/Join';

const Routes = (
  <Route path='/' component={Main}>
    <IndexRedirect to='/home' />
    <Route path='home' component={Home} />
    <Route path='share' component={Share} />
    <Route path='join' component={Join} />
    <Redirect from='*' to='/' />
  </Route>
);

export default Routes;