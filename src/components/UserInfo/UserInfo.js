import React, { Component, PropTypes } from 'react';

import Avatar from '../Avatar/Avatar';

export default class UserInfo extends Component {
	static propTypes = {
	}

	render() {
		const styles = require('./UserInfo.scss');
		return (
			<div style={{border: '1px solid blue'}} id={styles.user_info} className="float_right">
				<h2>User info</h2>
				<Avatar/>
				<span id="username">
				username
				</span>
				<span className="suffix_icon carrot"></span>
			</div>
		);
	}
}