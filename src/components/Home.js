import React, { Component } from 'react';
import { Link } from 'react-router';

class Home extends Component {
  render() {
    return (
      <div>
        Home Page
        <Link to='/share'>Share</Link>
        <Link to='/join'>Join</Link>
      </div>
    );
  }
}

export default Home;


