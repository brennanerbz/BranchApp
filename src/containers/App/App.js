import React, { Component, PropTypes } from 'react';

export default class App extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div id="app">
				<h1>App!</h1>
				{this.props.children}
			</div>
		);
	}
}