import React, { Component, PropTypes } from 'react';
import MessageComposer from './MessageComposer'

export default class ChatFooter extends Component {
	static propTypes = {
	}

	render() {
	    const style = require('./ChatFooter.scss');
		return (
			<div 
				id={style.chat_footer}>
				<MessageComposer {...this.props}/>
			</div>
		);
	}
}
