import React, { Component, PropTypes } from 'react';
import MessageComposer from './MessageComposer'

export default class ChatFooter extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div id="chat_footer">
				<h1>Chat footer</h1>
				<MessageComposer/>
			</div>
		);
	}
}