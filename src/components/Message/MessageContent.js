import React, { Component, PropTypes } from 'react';

import MessageSender from './MessageSender';
import MessageTs from './MessageTs';

export default class MessageContent extends Component {
	static propTypes = {
	}

	render() {
		const { firstMessage, message } = this.props,
		style = require('./Message.scss');
		return (
			<div className={style.message_content}>
				{
					firstMessage
					&&
					<MessageSender
						username={message.user.username}
					/>
				}
				{
					firstMessage
					&&
					<MessageTs
						timestamp={message.creation}
					/>
				}
				<span className={style.message_body}>
					{message.text}
				</span>
			</div>
		);
	}
}
