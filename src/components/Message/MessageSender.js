import React, { Component, PropTypes } from 'react';

export default class MessageSender extends Component {
	static propTypes = {
	}

	render() {
		const { username } = this.props,
		style = require('./Message.scss');
		return (
			<a className={style.message_sender}>
				{username}
			</a>
		);
	}
}
