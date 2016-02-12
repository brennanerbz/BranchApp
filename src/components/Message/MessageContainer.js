import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

/* Message components */
import MessageGutter from './MessageGutter';
import MessageContent from './MessageContent';
import MessageFeedback from './MessageFeedback';
import MessageSender from './MessageSender';
import MessageTs from './MessageTs';

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
		const isUser = user ? user.username === message.user.username : false
		return (
			<div onMouseOver={() => this.setState({isMouseOverMessage: true})} 
				 onMouseLeave={() => this.setState({isMouseOverMessage: false})} 
				 style={{width: '100%'}} 
				 className={'display_flex ' + style.message}>
				<div className={isUser ? 'flex_container_right' : ''}>
					<div className={style.message_wrapper + ' ' + 
					(messageRendered ? style.message_rendered : '') + ' '+ 
					(firstMessage ? style.first : '') + ' ' + 
					(isUser ? style.message_is_user : '')}>
						<MessageGutter
							message={message}
							firstMessage={firstMessage}
							isMouseOver={isMouseOverMessage}
							isUser={isUser}
						/>
						<div 
						style={{
							marginLeft: isUser ? '' : '75px', 
							marginRight: isUser ? '75px' : ''}} 
						className="display_flex flex_horizontal flex_nowrap">
						{
							firstMessage && !isUser
							&&
							<MessageSender
								username={message.user.username}
								order={isUser ? 2 : 1}
							/>
						}
						{
							firstMessage && false
							&&
							<MessageTs
								timestamp={message.creation}
								order={isUser ? 1 : 2}
							/>
						}
						</div>
						<MessageContent
							message={message}
							firstMessage={firstMessage}
							isUser={isUser}
						/>
						<MessageFeedback
							user={user}
							membership={membership}
							feed={feed}
							message={message}
							isMouseOverMessage={isMouseOverMessage}
							isUser={isUser}
						/>
					</div>
				</div>
			</div>
		);
	}
}

/**


*/
