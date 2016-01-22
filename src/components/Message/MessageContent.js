import React, { Component, PropTypes } from 'react';

import MessageSender from './MessageSender';
import MessageTs from './MessageTs';

export default class MessageContent extends Component {
	static propTypes = {
	}

	render() {
		const style = require('./Message.scss');
		return (
			<div className={style.message_content}>
				<MessageSender/>
				<MessageTs/>
				<span className={style.message_body}>
					Message content
				</span>
			</div>
		);
	}
}
