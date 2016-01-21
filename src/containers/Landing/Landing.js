import React, { Component } from 'react';
import { pushState } from 'redux-router';
import Helmet from 'react-helmet';

export default class Landing extends Component {
  render() {
    const styles = require('./Landing.scss');
    return (
      <div id="landing" className="">
        <Helmet title="Home"/>
        <h1>Landing</h1>
      </div>
    );
  }
}
