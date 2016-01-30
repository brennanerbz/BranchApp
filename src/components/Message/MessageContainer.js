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
		const { firstMessage, user, message, feed, membership } = this.props;
		const { isMouseOverMessage, messageRendered } = this.state;
		const style = require('./Message.scss');
		return (
			<div onMouseOver={() => this.setState({isMouseOverMessage: true})} 
				onMouseLeave={() => this.setState({isMouseOverMessage: false})}
				className={
					style.message_wrapper + ' ' 
					+ (messageRendered ? style.message_rendered : '') + ' '
					+ (firstMessage ? 'first' : '')
				}>
				<MessageGutter
					message={message}
					firstMessage={firstMessage}
					isMouseOver={isMouseOverMessage}
				/>
				<MessageContent
					message={message}
					firstMessage={firstMessage}
				/>
				<MessageFeedback
					user={user}
					membership={membership}
					feed={feed}
					message={message}
					isMouseOverMessage={isMouseOverMessage}
				/>
			</div>
		);
	}
}
