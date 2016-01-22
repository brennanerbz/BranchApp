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
		const { isMouseOverMessage } = this.state,
		style = require('./Message.scss');
		return (
			<div 
			onMouseOver={() => this.setState({isMouseOverMessage: true})}
			onMouseLeave={() => this.setState({isMouseOverMessage: false})}
			className={style.message_wrapper}>
				<MessageGutter/>
				<MessageContent/>
				<MessageFeedback
					isMouseOverMessage={isMouseOverMessage}
				/>
			</div>
		);
	}
}
