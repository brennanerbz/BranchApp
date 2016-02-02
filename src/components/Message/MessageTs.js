import React, { Component, PropTypes } from 'react';
import moment from 'moment';

export default class MessageTs extends Component {
	static propTypes = {
	}

	render() {
		const { timestamp } = this.props,
		style = require('./Message.scss'),
		ts = moment.utc(timestamp).local().format('h:mm a');
		return (
			<a className={style.message_ts}>
				{ts}
			</a>
		);
	}
}
