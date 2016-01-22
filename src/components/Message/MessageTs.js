import React, { Component, PropTypes } from 'react';

export default class MessageTs extends Component {
	static propTypes = {
	}

	render() {
		const style = require('./Message.scss');
		return (
			<a className={style.message_ts}>
				10:15 pm
			</a>
		);
	}
}
