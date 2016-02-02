import React, { Component, PropTypes } from 'react';
import MessageIcon from './MessageIcon';
import moment from 'moment';

export default class MessageGutter extends Component {
	static propTypes = {
	}

	render() {
		const { firstMessage, message, isMouseOver } = this.props;
		const style = require('./Message.scss');
		const ts = moment.utc(message.creation).local().format('h:mm a')
		return (
			<div className={style.message_gutter}>
				{firstMessage && <MessageIcon user={message.user}/>}
				{!firstMessage && isMouseOver && <span className={style.message_ts}>{ts}</span>}
			</div>
		);
	}
}
