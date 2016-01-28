import React, { Component, PropTypes } from 'react';
import MessageIcon from './MessageIcon';

export default class MessageGutter extends Component {
	static propTypes = {
	}

	render() {
		const { message } = this.props;
		const style = require('./Message.scss');
		return (
			<div className={style.message_gutter}>
				<MessageIcon user={message.user}/>
			</div>
		);
	}
}
