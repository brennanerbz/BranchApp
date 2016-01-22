import React, { Component, PropTypes } from 'react';
import Avatar from '../Avatar/Avatar';

export default class MessageIcon extends Component {
	static propTypes = {
	}

	render() {
		const style = require('./Message.scss');
		return (
			<div className={style.message_icon}>
				<Avatar size={36} message={true}/>
			</div>
		);
	}
}
