import React, { Component, PropTypes } from 'react';

export default class MessageSender extends Component {
	static propTypes = {
	}

	render() {
		const { username, order } = this.props;
		const style = require('./Message.scss');
		return (
			<a style={{order: order, fontSize: '13px', color: '#B2B2B2'}} className={style.message_sender}>
				{username}
			</a>
		);
	}
}
