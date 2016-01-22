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
				<MessageTs/>
				<MessageSender/>
				<h3>Message content</h3>
			</div>
		);
	}
}
