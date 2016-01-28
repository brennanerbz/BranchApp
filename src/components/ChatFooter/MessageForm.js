import React, { Component, PropTypes } from 'react';

export default class MessageForm extends Component {
	static propTypes = {
	}

	state = {
		text: ''
	}

	componentDidMount() {
		this.refs.message_input.focus()
	}

	componentDidUpdate(prevProps) {
		const { activeFeed } = this.props;
		if(prevProps.activeFeed !== activeFeed) this.refs.message_input.focus()
	}

	handleTyping() {
		const { user, membership, feed } = this.props;
		var userTyping = {
			user_id: user.id,
			membership_id: 1,
			feed_id: feed.id
		}
		console.log(userTyping)
		socket.emit('user typing', userTyping)
	}

	handleSubmitMessage() {
		const { text } = this.state;
		const { user, membership, feed } = this.props;
		// CHANGE THE NEWMESSAGE OBJECT ONCE MEMBERSHIP IS IN
		if(text.length > 0) {
			var newMessage = {
				id: Math.floor(Math.random() * 10000),
				parent_id: 1,
				user_id: user.id,
				membership_id: 1,
				feed_id: 1,
				text: text,
				message_type: 'text',
				creation: Date.now(),
				positives: 1,
				negatives: 0,
				user: {
					username: user.username,
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
				ref="message_input"
				tabIndex={1}
				autofocus={true}
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
