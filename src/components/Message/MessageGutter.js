import React, { Component, PropTypes } from 'react';

export default class MessageGutter extends Component {
	static propTypes = {
	}

	render() {
		const style = require('./Message.scss');
		return (
			<div className={style.message_gutter}>
				<h3>Message gutter</h3>
			</div>
		);
	}
}
