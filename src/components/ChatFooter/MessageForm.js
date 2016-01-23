import React, { Component, PropTypes } from 'react';

export default class MessageForm extends Component {
	static propTypes = {
	}

	state = {
		text: ''
	}

	handleTyping = () => {
		const { user, membership, feed } = this.props;
		var userTyping = {
			user_id: user.id,
			membership_id: membership.id,
			feed_id: feed.id
		}
		socket.emit('typing', userTyping)
	}

	handleSubmitMessage = () => {
		const { text } = this.state,
		{ user, membership, feed } = this.props;
		if(text.length > 0) {
			var newMessage = {
				user_id: user.id,
				membership_id: membership.id,
				text: text,
				message_type: 'text'
			}
			socket.emit('post message', newMessage)
			this.setState({
				text: ''
			});
		}
	}

	render() {
		const { text } = this.state,
		style = require('./ChatFooter.scss')
		return(
			<form id={style.message_form}>
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
					e.preventDefault()
					if(e.which == 13) {
						this.handleSubmitMessage()
					}
				}}
				/>
			</form>
		);
	}
}