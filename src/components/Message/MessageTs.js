import React, { Component, PropTypes } from 'react';

export default class MessageTs extends Component {
	static propTypes = {
	}

	render() {
		const style = require('./Message.scss');
		return (
			<div className={style.message_ts}>
				<h3>Message ts</h3>
			</div>
		);
	}
}
