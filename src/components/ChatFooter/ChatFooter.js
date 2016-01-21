import React, { Component, PropTypes } from 'react';
import MessageComposer from './MessageComposer'

export default class ChatFooter extends Component {
	static propTypes = {
	}

	render() {
	    const style = require('./ChatFooter.scss');
		return (
			<div 
				style={{border: '1px solid red'}}
				id={style.chat_footer}>
				<h1>Chat footer</h1>
				<MessageComposer/>
			</div>
		);
	}
}