import React, { Component, PropTypes } from 'react';

export default class MessageForm extends Component {
	static propTypes = {
	}

	render() {
		const style = require('./ChatFooter.scss')
		return(
			<form id={style.message_form}>
				<textarea 
				id={style.message_input}
				placeholder="Type a message..."
				/>
			</form>
		);
	}
}