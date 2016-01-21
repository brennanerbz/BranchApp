import React, { Component, PropTypes } from 'react';
import FileUpload from './FileUpload';
import MessageForm from './MessageForm';

export default class MessageComposer extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div id="message_composer">
				<h2>Message composer</h2>
				<FileUpload/>
				<MessageForm/>
			</div>
		);
	}
}