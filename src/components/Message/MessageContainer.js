import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

/* Message components */
import MessageGutter from './MessageGutter';
import MessageContent from './MessageContent';
import MessageFeedback from './MessageFeedback';


export default class MessageContainer extends Component {
	static propTypes = {
	}

	state = {
		isMouseOverMessage: false,
		messageRendered: false
	};

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				messageRendered: true
			});
		}, 1)
	}

	render() {
		const { message } = this.props,
		{ isMouseOverMessage, messageRendered } = this.state,
		style = require('./Message.scss');
		return (
			<div 
				onMouseOver={() => this.setState({isMouseOverMessage: true})}
				onMouseLeave={() => this.setState({isMouseOverMessage: false})}
				className={style.message_wrapper + ' ' + (messageRendered ? style.message_rendered : '')}>
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
