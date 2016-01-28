import React, { Component, PropTypes } from 'react';

export default class Avatar extends Component {
	static propTypes = {
		size: PropTypes.number,
		message: PropTypes.bool
	}

	render() {
		const { size, message, picture } = this.props,
		style = require('./Avatar.scss'),
		defaultProfilePic = require('./DefaultProfilePic.png')
		return (
			<span className={
				'inline_block' 
				+ ' ' + style.avatar_wrapper
				+ ' ' + (message ? style.avatar_message : '')
			}>
				<div 
				className={
					'circle' 
					+ ' ' + style.circle_avatar
					+ ' ' + style[`c_${String(size)}`]
				}>
					<img src={picture !== null ? picture : defaultProfilePic}/>
				</div>
			</span>
		);
	}
}
