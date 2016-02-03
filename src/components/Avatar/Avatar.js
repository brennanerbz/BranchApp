import React, { Component, PropTypes } from 'react';
import { isEmpty } from '../../utils/validation';

export default class Avatar extends Component {
	static propTypes = {
		size: PropTypes.number,
		message: PropTypes.bool
	}

	render() {
		const { size, message, user } = this.props;
		const style = require('./Avatar.scss');
		const picture = !isEmpty(user.profile_picture) ? user.gravatar : user.profile_picture;
		return (
			<span 
				className={
				'inline_block' 
				+ ' ' + style.avatar_wrapper
				+ ' ' + (message ? style.avatar_message : '')}>
				<div 
					className={
					'circle' 
					+ ' ' + style.circle_avatar
					+ ' ' + style[`c_${String(size)}`]}>
					<img src={picture}/>
				</div>
			</span>
		);
	}
} 