import React, { Component, PropTypes } from 'react';

export default class MessageSender extends Component {
	static propTypes = {
	}

	render() {
		const style = require('./Message.scss');
		return (
			<div className={style.message_sender}>
				<h3>Message sender</h3>
			</div>
		);
	}
}
