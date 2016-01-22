import React, { Component, PropTypes } from 'react';

export default class MessageFeedback extends Component {
	static propTypes = {
	}

	render() {
		const style = require('./Message.scss');
		return (
			<div className={style.message_feedback}>
				<h3>Message feedback</h3>
			</div>
		);
	}
}
