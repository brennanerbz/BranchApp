import React, { Component, PropTypes } from 'react';

/* Message components */
import MessageGutter from './MessageGutter';
import MessageContent from './MessageContent';
import MessageFeedback from './MessageFeedback';


export default class MessageContainer extends Component {
	static propTypes = {
	}

	render() {
		const style = require('./Message.scss');
		return(
			<div className={style.message_wrapper}>
				<MessageGutter/>
				<MessageContent/>
				<MessageFeedback/>
			</div>
		);
	}
}