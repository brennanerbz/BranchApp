import React, { Component, PropTypes } from 'react';

import MessageSender from './MessageSender';
import MessageTs from './MessageTs';

export default class MessageContent extends Component {
	static propTypes = {
	}

	render() {
		const { message } = this.props,
		style = require('./Message.scss');
		return (
			<div className={style.message_content}>
				<MessageSender
					username={message.user.username}
				/>
				<MessageTs
					timestamp={message.creation}
				/>
				<span className={style.message_body}>
					{message.text}
				</span>
			</div>
		);
	}
}
