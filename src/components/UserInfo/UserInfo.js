import React, { Component, PropTypes } from 'react';

import Avatar from '../Avatar/Avatar';

export default class UserInfo extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div id="user_info">
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