import React, { Component, PropTypes } from 'react';

export default class MessageSender extends Component {
	static propTypes = {
	}

	render() {
		const style = require('./Message.scss');
		return (
			<a className={style.message_sender}>
				Message sender
			</a>
		);
	}
}
