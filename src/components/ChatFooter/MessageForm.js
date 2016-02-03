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
		const { activeBranch, activeFeed, emptyFeed } = this.props;
		if(prevProps.activeFeed !== activeFeed
		|| prevProps.activeBranch !== activeBranch
		|| prevProps.emptyFeed && !emptyFeed) {
			this.refs.message_input.focus()
			setTimeout(() => {
				this.refs.message_input.focus()
			}, 250)
		}
	}

	handleTyping() {
		const { user, membership, feed, typers } = this.props;
		if(typers.filter(typer => typer.username !== user.username).length === 0) {
			var userTyping = {
				user_id: user.id,
				feed_id: feed.id
			}
			socket.emit('user typing', userTyping)
		}
	}

	handleSubmitMessage() {
		const { text } = this.state;
		const { user, membership, feed } = this.props;
		if(text.length > 0) {
			var newMessage = {
				user_id: user.id,
				// membership_id: membership.id,
				feed_id: feed.id,
				text: text,
				message_type: 'text'
			}
			socket.emit('post message', newMessage)
			this.setState({
				text: ''
			});
			// Scroll feed to bottom when user sends message
			var node = document.getElementById('messages_wrapper')
			node.scrollTop = node.scrollHeight
		}
	}

	render() {
		const { feed, emptyFeed } = this.props;
		const { text } = this.state;
		const style = require('./ChatFooter.scss');
		return (
			<form 
				key="messageForm" 
				onSubmit={(e) => e.preventDefault()} 
				id={style.message_form}>
				<textarea 
					className={emptyFeed ? style.disabled : ''}
					id={style.message_input}
					disabled={emptyFeed}
					ref="message_input"
					tabIndex={1}
					autofocus={true}
					placeholder={emptyFeed ? 'To send a message, open a new branch': 'Type a message...'}
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
