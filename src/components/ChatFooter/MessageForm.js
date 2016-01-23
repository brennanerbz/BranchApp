import React, { Component, PropTypes } from 'react';

export default class MessageForm extends Component {
	static propTypes = {
	}

	state = {
		text: ''
	}

	handleTyping() {
		// const { user, membership, feed } = this.props;
		// var userTyping = {
		// 	user_id: user.id,
		// 	membership_id: membership.id,
		// 	feed_id: feed.id
		// }
		// socket.emit('typing', userTyping)
	}

	handleSubmitMessage() {
		const { text } = this.state;
		// { user, membership, feed } = this.props;
		if(text.length > 0) {
			var newMessage = {
				id: Math.floor(Math.random() * 1000),
				parent_id: 1,
				user_id: 1,
				membership_id: 1,
				feed_id: 1,
				text: text,
				message_type: 'text',
				creation: Date.now(),
				positives: 1,
				negatives: 0,
				user: {
					username: 'brennanerbz',
					profile_picture: null
				}
			}
			this.props.receiveMessage(newMessage)
			// socket.emit('post message', newMessage)
			this.setState({
				text: ''
			});
		}
	}

	render() {
		const { text } = this.state,
		style = require('./ChatFooter.scss')
		return (
			<form key="messageForm" onSubmit={(e) => e.preventDefault()} id={style.message_form}>
				<textarea 
				id={style.message_input}
				placeholder="Type a message..."
				value={text}
				onChange={(e) => {
					this.setState({
						text: e.target.value
					});
					this.handleTyping()
				}}
				onKeyDown={(e) => {
					if(e.which == 13) {
						e.preventDefault()
						this.handleSubmitMessage()
					}
				}}
				/>
			</form>
		);
	}
}
