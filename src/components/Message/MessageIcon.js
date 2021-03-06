import React, { Component, PropTypes } from 'react';
import Avatar from '../Avatar/Avatar';

export default class MessageIcon extends Component {
	static propTypes = {
	}

	render() {
		const { user } = this.props;
		const style = require('./Message.scss');
		return (
			<div className={style.message_icon}>
				<Avatar size={33} message={true} user={user}/>
			</div>
		);
	}
}
