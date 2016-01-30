import React, { Component, PropTypes } from 'react';
import MessageIcon from './MessageIcon';
import moment from 'moment';

export default class MessageGutter extends Component {
	static propTypes = {
	}

	render() {
		const { firstMessage, message, isMouserOver } = this.props;
		const style = require('./Message.scss');
		const ts = moment.utc(message.ts).local().format('h:mm a')
		return (
			<div className={style.message_gutter}>
				{first && <MessageIcon user={message.user}/>}
				{!first && isMouseOver && <span className={style.message_ts}>{ts}</span>}
			</div>
		);
	}
}
