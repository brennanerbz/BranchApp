import React, { Component, PropTypes } from 'react';

/* Message components */
import MessageGutter from './MessageGutter';
import MessageSender from './MessageSender';
import MessageTs from './MessageTs';
import MessageContent from './MessageContent';
import MessageFeedback from './MessageFeedback';


export default class MessageContainer extends Component {
	static propTypes = {
	}

	render() {
		const style = require('./Message.scss');
		return(
			<div className="message_wrapper">
				<MessageGutter/>
				<MessageTs/>
				<MessageSender/>
				<MessageContent/>
				<MessageFeedback/>
			</div>
		);
	}
}