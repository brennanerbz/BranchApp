import React, { Component, PropTypes } from 'react';

/* Message components */
import MessageGutter from './MessageGutter';
import MessageContent from './MessageContent';
import MessageFeedback from './MessageFeedback';


export default class MessageContainer extends Component {
	static propTypes = {
	}

	state = {
		isMouseOverMessage: false
	};

	render() {
		const { message } = this.props,
		{ isMouseOverMessage } = this.state,
		style = require('./Message.scss');
		return (
			<div 
				onMouseOver={() => this.setState({isMouseOverMessage: true})}
				onMouseLeave={() => this.setState({isMouseOverMessage: false})}
				className={style.message_wrapper}>
				<MessageGutter
					message={message}
				/>
				<MessageContent
					message={message}
					key={'messageContent' + message.id}
				/>
				<MessageFeedback
					message={message}
					isMouseOverMessage={isMouseOverMessage}
				/>
			</div>
		);
	}
}
