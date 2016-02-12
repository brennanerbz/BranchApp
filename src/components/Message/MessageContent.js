import React, { Component, PropTypes } from 'react';

import MessageSender from './MessageSender';
import MessageTs from './MessageTs';

export default class MessageContent extends Component {
	static propTypes = {
	}

	render() {
		const { firstMessage, message, isUser } = this.props;
		const style = require('./Message.scss');
		return (
			<div className={style.message_content + ' ' + (isUser ? style.user : '')}>
				<span className={style.message_body}>
					{message.text}
				</span>
			</div>
		);
	}
}
